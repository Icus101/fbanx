import Image from "next/image";
import Link from "next/link";
import React from "react";
import logo3 from "/public/Transparent PNG/logo-07.png";

const Dream = () => {
  return (
    <div className="pb-[100px]">
      <div className="container mx-auto md:pt-[48px] pt-[16px] 2xl:max-w-[1320px] xl:max-w-[1140px] lg:max-w-[960px] md:max-w-[768px] sm:max-w-[540px]">
        <div className="flex flex-wrap justify-center">
          <div className="px-[12px] lg:flex-[0_0_auto] lg:w-[91.66666667%] md:w-[100%] w-[100%] max-w-[100%]">
            <div className="p-[20px] border-[1px] rounded-[20px] border-[rgb(29,234,183,0.14)]">
              <div className="mx-[-12px] flex flex-wrap items-center justify-evenly">
                <div className="px-[12px] max-w-[100%] lg:flex-[0_0_auto] lg:w-[33.333333333%] md:w-[50%] w-[100%] md:text-left">
                  <div className="mt-[-70px] pb-[20px]">
                    <Image
                      src={logo3}
                      alt="sol"
                      width={400}
                      height={400}
                      className="h-auto max-w-[100%] align-middle"
                    />
                  </div>
                </div>
                <div className="px-[12px] md:text-left mb-[8px] md:mb-0 lg:w-[41.66666667%] lg:flex-[0_0_auto] md:w-[50%] w-[100%]">
                  <div className="">
                    <div className="uppercase text-[50px] font-[700] mb-[30px] leading-[55px]">
                      dream big. play small
                    </div>
                    <p className="tracking-[1px] leading-[24px] mb-[48px] text-[16px] font-[400]">
                      ChainCircle is set to revolutionize the cryptocurrency
                      exchange industry with its innovative and customer-focused
                      platform, backed by an honest team and the latest in
                      blockchain technology.
                    </p>
                    <div>
                      <div className=" text-center rounded-[3px] bg-[#16123F] border-[1px] border-[#16123F] text-[#FFF] text-[18px] font-[700] py-[8px]">
                        <Link
                          href="/createToken"
                        >
                          <span className="relativ ">Create Token</span>
                        </Link>
                      </div>
                    </div>
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

export default Dream;
