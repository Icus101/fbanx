import React from "react";
import CreateToken from "../components/Apppage/CreateToken";
import Header from "../components/Apppage/Header";
import Sidebar from "../components/Apppage/Sidebar";

const createToken = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <CreateToken />
    </div>
  );
};

export default createToken;
