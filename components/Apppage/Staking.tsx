import React, { useState } from "react";

const Staking = () => {
  const [amount, setAmount] = useState<number>();
  const [selectedOption, setSelectedOption] = useState<number>(30);

  return (
    <div>
      <div>
        <div className="  mx-auto max-w-4xl pb-[40px">
          
          <div className="sm:flex block justify-between items-center mx-[10px] px-[10px] box-border">
            {/* <div>
              <h1
                style={{
                  background:
                    "linear-gradient(to right, rgb(0, 174, 239) 0%, rgb(140, 199, 59) 100%)",
                  display: "inline",
                  WebkitTextFillColor: "transparent",
                  WebkitBackgroundClip: "text",
                }}
                className="sm:text-[50px] text-[30px] uppercase max-w-[500px] font-[800]"
              >
                Welcome to $TUK TOKENS
              </h1>
              <p className="text-[#fff] text-center w-full sm:max-w-[60%] sm:mb-0 mb-[20px]">
                $TUK Token rewards will be distributed to users at a rate of
                4.75 $TUK per BSC block. Rewards will be payable over 3 years
                and are determined by your share of the staking pool and annual
                returns percentage.
              </p>
            </div> */}
            <div className="sm:w-[30%] w-full">
              {/* <button className="bg-[#29a9e0] p-[12px_16px]  rounded-[20px]">
              WITHDRAW STAKED TOKENS
            </button> */}
              {/* <Unstake /> */}
            </div>
          </div>

          {/* <Approve /> */}

          <div className=" text-[#fff] block place-content-center  sm:grid grid-cols-3 md:grid-cols- lg:grid-cols- gap-[20px] mx-[40px]  sm:mx-[20px]  mt-[50px]  ">
            <div className="border-[#29a9e0] bg-[#131b1b]  sm:mb-0 mb-[10px] rounded-[20px] p-[20px] border-[2px] ">
              <h1 className="text-[14px] mb-[4px] tracking-[1.4px]">
                STAKED BALANCE
              </h1>
              <h1 className="text-[#29a9e0] my-[8px] font-[700] text-[20px]">
                {/* <StakedBal />{" "} */}
                <sup className="text-[10px] text-[#fff]">$TUK</sup>
              </h1>
              <h1 className="text-[14px] mb-[4px]">YOUR STAKEABLE</h1>
              <h1 className="text-[#29a9e0] my-[8px] font-[700] text-[30px]">
                0 <sup className="text-[16px] text-[#fff]">$TUK</sup>
              </h1>
              <div className="flex flex-col space-y-4 pb-4">
                <input
                  type="number"
                  min={1}
                  value={amount}
                  onChange={(e) => setAmount(Number(e.target.value))}
                  className="border text-black border-gray-300 rounded-md p-2"
                  placeholder="Enter an amount"
                />
                <select
                  value={selectedOption}
                  onChange={(e) => setSelectedOption(Number(e.target.value))}
                  className="border text-black border-gray-300 rounded-md p-2"
                >
                  <option value="30">30</option>
                  <option value="60">60</option>
                  <option value="90">90</option>
                  <option value="120">120</option>
                </select>
              </div>
              <div className="text-center flex flex-col justify-center items-center">
                <button
                  //   disabled={!handleStake}
                  //   onClick={handleStake}
                  className="text-center border-[2px] border-[#ffd400] rounded-[20px] p-[10px_12px]"
                >
                  STAKE
                </button>
                {/* <div className="animate-spin text-center h-8 w-8 border-4 border-blue-500 rounded-full border-t-transparent"></div> */}
                {/* {isLoading && (
                  <div className="animate-spin text-center h-8 w-8 border-4 border-blue-500 rounded-full border-t-transparent"></div>
                )}
                {isSuccess && <div>Staked succesfully</div>} */}
              </div>
            </div>
            <div className="border-[#29a9e0] bg-[#131b1b] sm:mb-0 mb-[10px] flex flex-col justify-start p-[20px] border-[2px] rounded-[20px]">
              <h1 className="text-[14px] mb-[4px] tracking-[1.4px] ">
                % OF POOL
              </h1>
              <h1 className="my-[8px] text-[30px] font-[700]">0%</h1>
              <h1 className="text-[14px] mb-[4px] tracking-[1.4px]">
                TOTAL STAKED
              </h1>
              <h1 className="text-[#29a9e0] my-[8px] font-[700] text-[20px] xl:text-[30px]">
                28,299,213<sup className="text-[16px] text-[#fff]">$TUK</sup>
              </h1>
            </div>

            <div className="border-[#29a9e0] bg-[#131b1b] sm:mb-0 mb-[10px] flex flex-col justify-between tracking-[1.4px] border-[2px] p-[20px] rounded-[20px]">
              <div>
                <h1 className="text-[14px] mb-[4px] ">ESTIMATED REWARDS</h1>
                <h1 className=" my-[8px] font-[700] text-[30px]">
                  177% <sup className="text-[16px] text-[#fff]">p/a</sup>
                </h1>
              </div>

              <div className="text-[10px] font-[500]">
                <p>Returns = Annual Returns Percentage</p>
                <p>Monthly = Returns / 12</p>
                <p>Daily = Returns / 365</p>
              </div>
            </div>
            <div className="border-[#29a9e0] bg-[#131b1b] sm:mb-0 mb-[10px] border-[2px] p-[20px] rounded-[20px]">
              <h1 className="text-[14px] mb-[4px] tracking-[1.4px] ">
                CURRENT REWARDS
              </h1>
              <h1 className="text-[#29a9e0] my-[8px] font-[700] text-[30px]">
                4.75{" "}
                <sup className="text-[16px] text-[#fff]">Per BSC Block</sup>
              </h1>
            </div>
            <div className="border-[#29a9e0] bg-[#131b1b]  border-[2px] p-[20px] flex flex-col  justify-between rounded-[20px]">
              <div>
                <h1 className="text-[14px] mb-[4px] tracking-[1.4px]  ">
                  TOTAL REWARDS
                </h1>
                <h1 className="text-[#29a9e0] my-[8px] font-[700] text-[30px]">
                  {/* <EarnedRewards />{" "} */}
                  <sup className="text-[16px] text-[#fff]">$TUK</sup>
                </h1>
              </div>
              <div className="w-full text-center">{/* <ClaimReward /> */}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Staking;
