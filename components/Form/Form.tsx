import { FC } from "react";
import Box from '@mui/material/Box';

type FormProps = {
  children: React.ReactNode;
};

export const Form: FC<FormProps> = ({ children }) => {
  return (
    <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      {children}
    </Box>
  );
};
