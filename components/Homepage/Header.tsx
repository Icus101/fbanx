import React, { useEffect, useState } from "react";
import Image from "next/image";
import { SocialIcon } from "react-social-icons";
import Link from "next/link";
import * as FaIcons from "react-icons/fa";
import Navpop from "./Navpop";
import logo from "/public/EPS&SVG/full_logo.svg";
import logo1 from "/public/Transparent PNG/logo-04.png";
import logo3 from "/public/Transparent PNG/logo-03.png";
import logo6 from "public/Transparent PNG/logo-07.png";

const Header = () => {
  const [sidebar, setSideBar] = useState(false);
  const showSidebar = () => {
    if (sidebar) {
      document.body.classList.remove("over");
    } else {
      document.body.classList.add("over");
    }

    setSideBar(!sidebar);
  };
  const windowDist = () => {
    const element = document.getElementById("rid2")!;
    let dist = window.pageYOffset;
    if (dist > 63) {
      element?.classList?.add("navbar-fixed");
    } else {
      if (dist < 64) {
        element?.classList?.remove("navbar-fixed");
      }
    }
  };
  useEffect(() => {
    addEventListener("scroll", windowDist);
  }, []);

  return (
    <div className="min-h-screen ">
      <nav
        id="rid2"
        className="lg:pt-[50px]   lg:px-[48px]  translate-y-0  flex justify-between lg:flex-nowrap items-center text-[#fff] pb-[8px] relative text-[16px] font-[400] leading-[24px]  "
      >
        <Link href="#" className="">
          <div className="flex items-center">
            <Image
              src={logo1}
              alt="logo"
              width={250}
              height={70}
              className=""
            />
          </div>
        </Link>

        <ul className=" flex items-center font-[400] text-[16px] text-start   ">
          <li className="mr-[20px] sm:flex hidden justify-center rounded-[5px]  items-center border-[1px] p-[10px_10px] bg-[#16123F] border-[#16123F] text-[#FFF]  text-left  font-[400] leading-[24px]">
            <Link
              href="/escrow"
              className="  px-[8px]  text-[18px] font-[700]  decoration-solid decoration-auto"
            >
              Escrow Services
            </Link>
          </li>
          <li className="mr-[20px]  justify-center sm:flex hidden  rounded-[5px]  items-center border-[1px]  p-[10px_10px] hover:bg-[#16123F] border-[#16123F] text-left  font-[400] leading-[24px]">
            <Link
              href="/appL"
              className=" px-[8px] text-left font-[700]  decoration-solid decoration-auto "
              id="ridwan"
            >
              Launch App
            </Link>
          </li>
          <li className="mr-[20px] sm:flex hidden border-[1px] rounded-[5px]  p-[10px_10px]  items-center justify-center hover:bg-[#16123F] border-[#16123F]  text-left  font-[400] leading-[24px]">
            <Link
              href="#"
              className=" px-[8px] text-left font-[700]  decoration-solid decoration-auto"
            >
              Email
            </Link>
          </li>
        </ul>
        <div>
          <Link href="#" className="">
            <FaIcons.FaBars size={"2em"} onClick={showSidebar} />
          </Link>
        </div>
      </nav>

      <div className=" box-border text-start text-[16px] leading-[24px]">
        <div className="container 2xl:max-w-[1320px] xl:max-w-[1140px] lg:max-w-[960px] md:max-w-[768px] sm:max-w-[540px]  font-[400] pl-[10px] mx-auto leading-[24px] pt-[100px] text-start">
          <div className=" justify-between flex  items-center  text-[16px] font-[400] leading-[24px]  text-start ">
            <div>
              <div className="flex flex-wrap pb-[16px] pt-[4px] justify-center items-center text-center mx-[-12px]">
                <div className="lg:w-[50%] lg:flex-[0_0_auto] md:w-[100%] justify-center items-center box-border md:flex-[0_0_auto]  text-[16px] font-[400] leading-[24px] my-[0px] max-w-[100%] order-1 md:order-2  text-center ">
                  <Image
                    src="/kkk.gif"
                    alt="gif"
                    width={450}
                    height={350}
                    className="align-middle h-[auto]  m-auto  lg:inlin  max-w-[100%]"
                  />
                </div>
                <div className="xl:w-1/2 lg:w-1/2 md:w-[100%] lg:order-1 max-w-[100%] box-border flex flex-col justify-center sm:items-start items-center flex-wrap shrink-0 text-[16px] font-[400] leading-[24px]   order-2 ">
                  <Image
                    src={logo3}
                    alt="logo"
                    width={300}
                    height={150}
                    className=""
                  />
                  <div className="box-border text-[rgb(255,255,255)] italic md:text-[20px] text-[14px] leading-[30px] mb-[8px] max-w-[100%] text-center md:text-start">
                    Escrow Services | Decentralized Exchange | DeFi | Swap |
                    Token Creator | Token Vesting | Presale | Dapps Store |
                    Launchpad
                  </div>
                  <div className="box-border text-center md:text-left mx-aut flex-wrap flex text-[16px] font-[400] mb-[4px] leading-[24px] md:justify-start justify-center  ">
                    <div className="border-[1px] rounded-[3px] border-[#16123F] bg-[#16123F] text-[#FFF]  mt-[24px] cursor-pointer mb-[4px] mr-[20px]   relative text-center text-[15px] md:text-[18px] font-[700] leading-[26px] md:leading-[42px] w-[168px] md:w-[193px] px-[12px] py-[6px] ">
                      <Link href="/appL">
                        <span>Launch App</span>
                      </Link>
                    </div>
                    <div className="border-[1px] rounded-[3px] border-[#16123F]  justify-center bg-[#16123F] text-[#FFF]  items-center mt-[24px] cursor-pointer mb-[4px] mr-[20px] relative text-center text-[15px] md:text-[18px] font-[700] leading-[26px] md:leading-[42px] w-[168px] md:w-[193px] px-[12px] py-[6px] ">
                      <Link href="/escrow">
                        <span>Escrow Services</span>
                      </Link>
                    </div>
                  </div>
                  <div className="text-[16px] leading-[24px] font-[400] mb-[4px] flex md:justify-start justify-center  ">
                    <div className="inline-block ">
                      <a
                        className="ml-[-3px] inline-flex w-[50px]  items-center justify-center mt-[20px] h-[40px] mr-[10px] text-start cursor-pointer decoration-[rgb(255,255,255)]"
                        href="https://t.me/cfg"
                        title="Telegram"
                      >
                        <SocialIcon
                          className=""
                          style={{ width: "40px", height: "40px" }}
                          bgColor="#16123F"
                          url="https://t.me/"
                        />
                      </a>
                      <a
                        className="inline-flex mt-[20px] w-[50px] h-[40px] mr-[10px] text-center cursor-pointer"
                        href="https://twitter.com/"
                        title="Twitter"
                      >
                        <SocialIcon
                          style={{ width: "40px", height: "40px" }}
                          bgColor="#16123F"
                          url="https://twitter.com/"
                        />
                      </a>
                      <a
                        className="inline-flex w-[50px] mt-[20px] h-[40px] mr-[10px] text-center cursor-pointer"
                        href="https://www.linkedin.com/"
                        title="Linkedin"
                      >
                        <SocialIcon
                          style={{ width: "40px", height: "40px" }}
                          bgColor="#16123F"
                          url="https://www.linkedin.com/"
                        />
                      </a>
                      <a
                        className="inline-flex w-[50px] mt-[20px] h-[50px] mr-[10px] text-center cursor-pointer"
                        href="https://medium.com/"
                        title="medium"
                      >
                        <SocialIcon
                          style={{ width: "40px", height: "40px" }}
                          bgColor="#16123F"
                          url="https://www.medium.com/"
                        />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Navpop sidebar={sidebar} showSidebar={showSidebar} />
    </div>
  );
};

export default Header;
