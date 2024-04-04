import type { NextPage } from "next";
import Head from "next/head";
import Header from "../components/Apppage/Header";

import Swap from "../components/Swap/Swap";
import { useState } from "react";

const Home: NextPage = () => {
  
  return (
    <div>
      <Head>
        <title>FBNX</title>
        <meta name="Fbanx" content="" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="h-screen text-white ">
        <Header />
        <Swap/>
      </main>
    </div>
  );
};

export default Home;
