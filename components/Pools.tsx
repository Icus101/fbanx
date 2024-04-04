import {
  getAccount,
  getAssociatedTokenAddress,
  getMint,
  getOrCreateAssociatedTokenAccount,
} from "@solana/spl-token";
import { useConnection } from "@solana/wallet-adapter-react";
import React, { useEffect, useState } from "react";
import { PublicKey, Keypair } from "@solana/web3.js";
import { Mint1, usdcMint, Mint2, solMint } from "./Swap/const";
import {
  mint1,
  mint2,
  authority,
  token_pool_mint,
  token_pool_mint_ata,
} from "../utils/constant";
import Header from "./Apppage/Header";
import Details from "./Details";
import { IoMdArrowDropdown } from "react-icons/io";

const Pools = () => {
  const [tokenX, setTokenX] = useState<number>(0);
  const [tokenY, setTokenY] = useState<number>(0);
  const [supply, setSupply] = useState<number>(0);
  const [showDetails, setShowDetails] = useState<boolean>(false);

  const handleDetails = () => {
    console.log("clicked");
    setShowDetails(!showDetails);
  };

  const { connection } = useConnection();

  const update = async () => {
    try {
      let vault1 = await getAssociatedTokenAddress(mint1, authority, true);
      let vault0 = await getAssociatedTokenAddress(mint2, authority, true);
      let swapTokenA = await getAccount(connection, vault0);
      let swapTokenB = await getAccount(connection, vault1);
      let poolMintInfo = await getMint(connection, token_pool_mint);
      setTokenX(Number(swapTokenA.amount));
      setTokenY(Number(swapTokenB.amount));
      setSupply(Number(poolMintInfo.supply));
    } catch (error) {
      return;
    }
  };

  useEffect(() => {
    update();
  }, []);

  return (
    <main className="p-[15px] flex flex-col relative w-[100%] md:p-[15px_25px] xl:p-[15px_32px] ">
      <h1 className="text-center text-[40px] font-[400]">POOLS</h1>
      <div className="flex justify-between items-center mb-[15px] xl:mb-[25px]">
        <div className="lg:mr-[45px] mr-[35px] w-[100%] xl:max-w-[345px] max-w-[230px]">
          <div className="p-[2px] relative">
            <input
              type="text"
              placeholder="search pools"
              className="lg:h-[52px] h-[36px] py-[1px] pl-[52px] pr-[10px] bg-[#161617] w-[100%] text-start font-[400] border-[1px] rounded-[10px]"
            />
          </div>
        </div>
        {/* <div>
                    <div>
                        Sort By
                    </div>
                </div> */}
        {/* <div className=''>
                    <div>
                        Liquidity
                    </div>
                </div>
                <div>
                    Icon
                </div> */}
      </div>
      <div className="p-[2px] w-[100%] border-[2px] border-[#333] rounded-[20px]">
        <div className="flex flex-col w-[100%]">
          <div className="grid grid-cols-3">
            <div className="flex items-center justify-center font-[500] p-[12px_15px] xl:p-[22px_15px]">
              <span>Currency</span>
            </div>
            <div className="flex items-center justify-center font-[500] p-[12px_15px] xl:p-[22px_15px]">
              <span>Liquidity</span>
            </div>
            <div className="flex items-center justify-center font-[500] p-[12px_15px] xl:p-[22px_15px]">
              <span>APR%</span>
            </div>
          </div>
          <div className="flex relative flex-col pb-[10px]">
            <div className="grid grid-cols-3 ">
              <div className="flex items-center justify-center font-[500] p-[12px_15px] xl:p-[22px_15px]">
                FBANX/USDC
              </div>

              <div className="flex items-center justify-center font-[500] p-[12px_15px] xl:p-[22px_15px]">
                $123344
              </div>

              <div className="flex items-center justify-center font-[500] p-[12px_15px] xl:p-[22px_15px]">
                0.10%
              </div>
            </div>
            <div className="absolute  right-[20px] top-[-10px]  cursor-pointer">
              <IoMdArrowDropdown onClick={handleDetails} size={"2em"} />
            </div>
            <Details detailState={showDetails} />
          </div>
          {/* <div>
                        TOKEN-X/TOKEN-Y
                    </div>
                    <p>Summary</p>

                    <div>
                        FBNX :
                        <span>{` ${tokenX} TOKEN-X`}</span>
                    </div>
                    <div>
                        USDC :
                        <span>{` ${tokenY} TOKEN-Y`}</span>
                    </div>
                    <div>
                        POOL MINT SUPPLY :
                        <span>
                            {` ${supply} LP-TOKEN`}

                        </span>
                    </div> */}
        </div>
      </div>
    </main>
  );
};

export default Pools;
