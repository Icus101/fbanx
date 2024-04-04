import React from "react";
import Header from "../components/Apppage/Header";
import Sidebar from "../components/Apppage/Sidebar";
import Header2 from "../components/Header2";
import Pools from "../components/Pools";

const pool = () => {
  return (
    <div className="] text-white h-screen">
      <Header/>
        <Pools />
      
    </div>
  );
};

export default pool;
