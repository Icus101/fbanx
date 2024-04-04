import React from "react";
import Liquidity from "../components/Liquidity/AddLiquidity";
import Header from "../components/Apppage/Header";
import Header2 from "../components/Header2";
import Sidebar from "../components/Apppage/Sidebar";

const liquidity = () => {
  return (
    <div className=" text-white h-screen">
      <Header />

      <Liquidity />
    </div>
  );
};

export default liquidity;
