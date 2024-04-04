import React, { Fragment } from "react";
import SolutionCard from "./SolutionCard";

const Solutions = () => {
  return (
    <div className="text-white  text-[16px] pb-[100px] box-border font-[400] text-start leading-[24px] ">
      <div className="container 2xl:max-w-[1320px] xl:max-w-[1140px] lg:max-w-[960px] md:max-w-[768px] sm:max-w-[540px] px-[12px] m-auto">
        <div className="mb-[24px] uppercase leading-[75px] text-[20px] sm:text-[50px] text-center ">
          defi solutions from CCX
        </div>
        <p className="max-w-[984px] m-auto italic font-[300] text-[20px] leading-[30px] text-center">
          The focal point of creating an integrated system like ChainCircle is
          to help initiate and manage decentralized finances. CCX will introduce
          the following solutions through its decentralized ecosystem.
        </p>
        <div className="flex  mt-[48px] mx-[-12px]">
          <div className=" px-[12px] max-w-[100%] lg:w-[100%] md:w-[100%] ">
            <div className="flex flex-wrap  mx-[-12px] ">
              <SolutionCard
                imgurl="/solution-1.png"
                summary="You don't have to worry about being scammed again after giving out your project.Our escrow services ensure that you sleep with your eye closed as our secure smart contract is enough to secure your funds."
              >
                <div> Escrow Services</div>
              </SolutionCard>
              <SolutionCard
                imgurl="/solution-1.png"
                summary="CCX Launchpad will facilitate upcoming ChainCircle ecosystem projects to raise funds in decentralized manner. All the CFB token staked users will get priority pass based on their staked amount."
              >
                <div> IDO Launchpad for Decentralized Fundraising</div>
              </SolutionCard>
              <SolutionCard
                imgurl="/solution-2.png"
                summary="ChainCircleDEX will make open Serum DEX. The platform will improve trading features and rich UI designs. It will also offer a custom UI where the participants get to design their DEX screen based on their needs."
              >
                <div>DEXs for Crypto Trading</div>
              </SolutionCard>
              <SolutionCard
                imgurl="/solution-4.png"
                summary="In simple steps,you can create your spl tokens and token2020(Tax Token) . "
              >
                <div>
                  Token
                  <br />
                  Creation
                </div>
              </SolutionCard>
              <SolutionCard
                imgurl="/solution-3.png"
                summary="ChainCircle Token swaps platforms are used for private and public token swaps. Private token swaps are only available to the users with token purchases and public swap is available to everyone on the ChainCircle platform."
              >
                <div>
                  Token <br /> Swapping
                </div>
              </SolutionCard>
              
              <SolutionCard
                imgurl="/solution-5.png"
                summary="ChainCircle lets CCX token users earn rewards if they stake CCX tokens. The more they stake CCX tokens, more the rewards they will have from the platform."
              >
                <div>
                  Token
                  <br />
                  Staking
                </div>
              </SolutionCard>
              <SolutionCard
                imgurl="/solution-6.png"
                summary="ChainCircle launchpad projects to lock the tokens. Teams, companies, and any user can lock their tokens that will be released on maturity dates through smart contract."
              >
                <div>
                  Token
                  <br />
                  Vesting
                </div>
              </SolutionCard>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Solutions;
