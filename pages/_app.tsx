import "../styles/globals.css";
import type { AppProps } from "next/app";
import WalletContextProvider from "../components/WalletContextProvider";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import Header from "../components/Apppage/Header";
import Sidebar from "../components/Apppage/Sidebar";
import { Children } from "react";
import Swap from "../components/Swap/Swap";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <WalletContextProvider>
      <Component {...pageProps} />
    </WalletContextProvider>
  );
}

export default MyApp;
