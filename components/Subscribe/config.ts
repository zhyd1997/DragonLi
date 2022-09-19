import { ethers } from "ethers";

export const customHttpProvider = new ethers.providers.JsonRpcProvider({
  url: `https://goerli.infura.io/v3/${process.env.NEXT_PUBLIC_INFURA_API_KEY}`,
});
