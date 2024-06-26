import * as Web3 from "@solana/web3.js";

import Usdt from "cryptocurrency-icons/svg/color/usdt.svg";
import Usdc from "cryptocurrency-icons/svg/color/usdc.svg";
import Sol from "cryptocurrency-icons/svg/color/sol.svg";
import Btc from "cryptocurrency-icons/svg/color/btc.svg";
import logo from "/public/Transparent PNG/logo-04.png";
// FBNX/USDT
export const fbanxUsdt = new Web3.PublicKey(
  "5esbBc5dPwN3EXtq1VN7MfeM6idJTXCU3CUTphCWURi4"
);

export const ccx = new Web3.PublicKey(
  "GkbyHgD2roA6pCSBrNSzqV3szJQQtCToLMpcg3DxLny7"
);

export const usdt = new Web3.PublicKey(
  "7gPHzvRMLRXE8sQZJYZeJ3vXmHRbkwqSDgMyN6bM1e8u"
);

// FBNX/USDC
export const ccxUsdc = new Web3.PublicKey(
  "5esbBc5dPwN3EXtq1VN7MfeM6idJTXCU3CUTphCWURi4"
);
export const usdc = new Web3.PublicKey(
  "5esbBc5dPwN3EXtq1VN7MfeM6idJTXCU3CUTphCWURi4"
);

// FBNX/SOL
export const fbanxSol = new Web3.PublicKey(
  "5esbBc5dPwN3EXtq1VN7MfeM6idJTXCU3CUTphCWURi4"
);
export const sol = new Web3.PublicKey(
  "5esbBc5dPwN3EXtq1VN7MfeM6idJTXCU3CUTphCWURi4"
);

export const tokens = [
  {
    id: 1,
    name: "CCX/USDT",
    poolAddress: "",
    subToken: [
      {
        id: 0,
        tokenName: "CCX/USDT",
        // icon: "",
        name: "tokens",
        tokenAddress: fbanxUsdt,
      },
      {
        id: 1,
        tokenName: "CCX",
        icon: logo,
        name: "tokens",
        tokenAddress: ccx,
      },
      {
        id: 2,
        tokenName: "USDT",
        icon: Usdt,
        name: "tokens",
        tokenAddress: usdt,
      },
    ],
  },

  {
    id: 2,
    name: "CCX/USDC",
    poolAddress: "",
    subToken: [
      {
        id: 0,
        tokenName: "CCX/USDC",
        // icon: '',
        name: "tokens",
        tokenAddress: ccxUsdc,
      },
      {
        id: 1,
        tokenName: "FBNX",
        icon: logo,
        name: "tokens",
        tokenAddress: ccx,
      },
      {
        id: 2,
        tokenName: "USDC",
        icon: Usdc,
        name: "tokens",
        tokenAddress: usdc,
      },
    ],
  },
  {
    id: 3,
    name: "CCX/SOL",
    poolAddress: "",
    subToken: [
      {
        id: 0,
        tokenName: "CCX/SOL",
        // icon: '',
        name: "tokens",
        tokenAddress: fbanxSol,
      },
      {
        id: 1,
        tokenName: "CCX",
        icon: logo,
        name: "tokens",
        tokenAddress: ccx,
      },
      {
        id: 2,
        tokenName: "SOL",
        icon: Sol,
        name: "tokens",
        tokenAddress: sol,
      },
    ],
  },
];