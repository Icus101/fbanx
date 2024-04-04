import React from "react";
import Details from "../components/Details";
import Sidebar from "../components/Apppage/Sidebar";
import Header from "../components/Apppage/Header";
import Staking from "../components/Apppage/Staking";

const stake = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <Staking />
    </div>
  );
};

export default stake;
