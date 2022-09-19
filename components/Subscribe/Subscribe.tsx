import React, { FC, useEffect, useState } from "react";
import type { CSSProperties } from "react";
import { Framework } from "@superfluid-finance/sdk-core";
import { Signer, utils } from "ethers";
import { chainId, useAccount, useSigner } from "wagmi";
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import LoadingButton from '@mui/lab/LoadingButton';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { customHttpProvider } from "./config";
import { Form } from "@/components/Form";
import { styled } from "@mui/material";

const paymentToken = 'fDAIx';

const ModalFooter = styled('div')`
  display: flex;
  align-items: center;
`;

type SubscribeProps = {
  recipient: string;
  style?: CSSProperties;
};

export const Subscribe: FC<SubscribeProps> = ({ recipient, style={} }) => {
  const { address: account } = useAccount();
  const { data: signer } = useSigner({ 
    onError(err) {
      console.error(err);
    },
  });
  const [open, setOpen] = useState<boolean>(false);
  const [amount, setAmount] = useState<string>('');
  const [isValid, setIsValid] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isFetchingFlow, setIsFetchingFlow] = useState<boolean>(false);
  const [isSubscribed, setIsSubscribed] = useState<boolean>(false);
  const [balance, setBalance] = useState<string | undefined>();

  useEffect(() => {
    if (!signer || !account) {
      return;
    }

    (async () => {
      const sf = await Framework.create({
        chainId: chainId.goerli,
        provider: customHttpProvider,
      });

      const superToken = await sf.loadSuperToken(paymentToken);
      const _balance = await superToken.balanceOf({ account, providerOrSigner: signer });

      setBalance(_balance);
    })();
  }, [account, signer]);

  useEffect(()  => {
    if (!signer || !account) {
      return;
    }
    (async () => {
      setIsFetchingFlow(true);
      const sf = await Framework.create({
        chainId: chainId.goerli,
        provider: customHttpProvider,
      });
      
      const superToken = await sf.loadSuperToken(paymentToken);
      const DAIx = superToken.address;
      
      const sender = account;
      const receiver = utils.getAddress(recipient);

      const { flowRate } = await sf.cfaV1.getFlow({
        superToken: DAIx,
        sender,
        receiver,
        providerOrSigner: signer,
      });

      setIsFetchingFlow(false);
      if (flowRate === '0') {
        setIsSubscribed(false);
      } else {
        setIsSubscribed(true);
      }
    })();
  }, [account, recipient, signer]);

  const handleOpen = async () => {
    setOpen(true);
  }
  const handleClose = () => {
    setOpen(false);
  }

  const validate = (value: string) => {
    return (
      typeof Number(value) !== 'number' ||
      isNaN(Number(value)) ||
      Number(value) === 0 // FIXME: minimum deposit amount.
    );
  };

  const onChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = evt.target;
    setAmount(value);
    const _isInValid = validate(value);
    if (_isInValid) {
      setIsValid(false);
    } else {
      setIsValid(true);
    }
  };

  const createFlow = async (
    recipient: string,
    // amount per mounth in Ether (or in dollars if using stablecoins)
    amount: string,
    signer: Signer,
  ) => {
    setIsLoading(true);
    const _isInValid = validate(amount);
    if (_isInValid) {
      setIsLoading(false);
      return;
    }

    try {
      const monthlyAmount = utils.parseEther(amount);
      const flowRate = monthlyAmount.div(60 * 60 * 24 * 30).toString();

      const receiver = utils.getAddress(recipient);

      const sf = await Framework.create({
        chainId: chainId.goerli,
        provider: customHttpProvider,
      });
  
      const superToken = await sf.loadSuperToken(paymentToken);
      const DAIx = superToken.address;

      const userData = utils.defaultAbiCoder.encode(['string'], ['zhyd1997.eth']);

      const createFlowOperation = sf.cfaV1.createFlow({
        flowRate,
        receiver,
        superToken: DAIx,
        userData,
      });

      await createFlowOperation.exec(signer);
      setIsLoading(false);
      setOpen(false);
      setIsSubscribed(true);
    } catch (e) {
      console.error(e);
      setIsLoading(false);
    }
  };

  const subscribe = async () => {
    if (!signer) return;
    await createFlow(recipient, amount, signer);
  };

  return (
    <div style={style}>
      <LoadingButton
        variant="contained"
        color="primary"
        disabled={isLoading || isFetchingFlow || isSubscribed}
        loading={isLoading || isFetchingFlow}
        loadingIndicator={"loading..."}
        onClick={handleOpen}
      >
        {isSubscribed ? 'Subscribed' : 'Subscribe'}
      </LoadingButton>
      <Modal
        aria-labelledby="subscribe-modal"
        aria-describedby="the-way-to-support-the-author"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={{
            position: 'absolute' as 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            border: '2px solid #000',
            boxShadow: 24,
            p: 4,
          }}>
            <Typography id="subscribe-the-author" variant="h6" component="h2">
              Subscribe the author
            </Typography>
            <Typography
              id="continuous-support-the-author-per-second-instead-of-one-time-payment"
              color="text.secondary"
              sx={{ mt: 2 }}
            >
              continuous support the author per second instead of one-time payment.
            </Typography>
            <br />
            <Form>
              <TextField
                error={!isValid}
                id="outlined-controlled-input"
                label={"DAIx/month"}
                value={amount}
                onChange={onChange}
                helperText={!isValid && "Incorrect entry."}
              />
            </Form>
            <br />
            <ModalFooter>
              <Typography id="supertoken balance" variant="body2">
                <b>{paymentToken}</b>
                {' '}
                balance:
                {' '}
                <b>{balance}</b>
              </Typography>

              <LoadingButton
                variant="contained"
                color="success"
                sx={{ marginLeft: "auto" }}
                disabled={isLoading || balance === '0'}
                loading={isLoading}
                loadingIndicator={"loading..."}
                onClick={subscribe}
              >
                Yes
              </LoadingButton>
            </ModalFooter>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};
