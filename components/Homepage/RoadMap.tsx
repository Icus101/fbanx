import React from "react";
import RoadmapProp from "./RoadmapProp";

const RoadMap = () => {
  return (
    <div className=" ">
      <div className="container 2xl:max-w-[1320px] xl:max-w-[1140px] lg:max-w-[960px] md:max-w-[768px] sm:max-w-[540px] pb-[100px] mx-[auto] px-[12px] ">
        <div className="mb-[24px] text-[30px] sm:text-[50px] font-[700] leading-[75px] uppercase text-center">
          roadmap
        </div>
        <p className="max-w-[793px] m-[auto] text-[20px] italic font-[300] text-center leading-[30px]">
          We follow these roadmap for launching the ChainCircle ecosystem.We may
          experience certain setbacks while developing the whole ChainCircle
          ecosystem,but our team has a right attitude to stick to the course,no
          matter what!
        </p>

        <div className="relative m-[auto]  mt-[50px] mx-[auto]  pl-[64px] max-w-[700px]  ">
          <div className='before:content-[""] absolute md:left-0 left-[25px] top-0 w-[1px] h-[100%] bg-[#0761d7]'></div>

          <RoadmapProp quarter=" Q2" date="The Start 2024">
            <>
            <li>SPL Smart Contract on Solana Mainnet</li>
            <li>Team Allocation and Presale</li>
            <li>Dapp Launch with escrow and Token Creations</li>
            <li>CCX Available to trade</li>
            </>
            
          </RoadmapProp>
          <RoadmapProp quarter=" Q3" date="The Growth 2024">
            <>
              <li>ChainCircle Dapp MarketPlace</li>
              <li>DEX public secuirity by 3rd party</li>
              <li>ChainCircle Launchpad</li>
              <li>Listing of Token on Raydium</li>
            </>
          </RoadmapProp>
          <RoadmapProp quarter="Q4" date=" The Future 2024">
            <>
              <li>CryptoCircle Network Phase 2.0</li>
              <li>CrossChain transaction network implementation</li>
              <li>Launching of Dex</li>
              <li>Education for Aspiring Bllockchain devs</li>
              <li>Launching on EVM CHAINS</li>
            </>
          </RoadmapProp>
          
          
        </div>
      </div>
    </div>
  );
};

export default RoadMap;
