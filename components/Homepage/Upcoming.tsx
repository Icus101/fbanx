import Image from "next/image";
import React from "react";
import logo5 from "/public/Transparent PNG/logo-08.png";

const Upcoming = () => {
  return (
    <div className=" box-border pb-[100px]">
      <div className="container 2xl:max-w-[1320px] xl:max-w-[1140px] lg:max-w-[960px] md:max-w-[768px] sm:max-w-[540px] m-auto px-[12px]  ">
        <div className="px-[-12px] flex flex-wrap justify-center">
          <div className="max-w-[100%] px-[12px] md:w-[100%] lg:flex-[0_0_auto] lg:w-[91.6666667%]">
            <div>
              <div className="mx-[-12px] p-[20px] border-[1px] rounded-[20px] border-[rgb(29,234,83,0.14)] flex items-center justify-center flex-wrap">
                <div className="order-2 md:order-1 max-w-[100%] px-[12px] lg:w-[41.6667%] md:w-[50%]">
                  <div>
                    <div className="uppercase text-[20px] sm:text-[50px] font-[700] leading-[55px] mb-[30px] text-left">
                      checkout upcoming <br /> project
                    </div>
                    <p className="tracking-[1px] text-[16px] font-[400] leading-[24px] text-left mb-[25px]">
                      As we progress into Q3 2024, ChainCircle will continue to
                      improve its offerings, with the launch of its
                      decentralized exchange (DEX), the introduction of token
                      staking and farming, and the release of the ChainCircle
                      launchpad.
                    </p>
                    <div className="">
                      <div className="inline-block relative overflow-hidden rounded-[3px]">
                        <a
                          href="#"
                          className="inline-block rounded-[3px] bg-[#16123F] border-[1px] border-[#16123F] text-[#FFF] text-[18px] font-[700] leading-[42px] mr-[20px] px-[16px] py-[8px]"
                        >
                          <span className=" z-[1000]">
                            Upcoming IDOs
                          </span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="order-1 md:order-2 max-w-[100%] px-[12px] md:w-[50%] lg:w-[33.3333%]">
                  <div className="mt-[-70px] pb-[20px]">
                    <Image
                    alt = 'logo5'
                      src={logo5}
                      width={300}
                      height={300}
                      className="max-w-[100%] h-auto"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Upcoming;
