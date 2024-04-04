import { FC, ReactNode, useState } from "react";
import Link from "next/link";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useRouter } from "next/router";
import Image from "next/image";
import Sidebar from "./Sidebar";
import Swap from "../Swap/Swap";
import { FaBars, FaTimes } from "react-icons/fa";
import { SideBardata } from "../SidebarData";
import logo1 from "/public/Transparent PNG/logo-04.png";

const Header: FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <div className="">
      <div className="flex pr-2 justify-between items-center md:px-[10px] py-4 relativ top- w-full z-[1000]">
        <div className="flex items-center justify-between w-[100%] gap-x-1 md:gap-x-12">
          <div className=" flex text-3xl font-bold cursor-pointer items-center ">
            {/* <Link href="/">
              <Image src="/logo.png" alt="logo" height={70} width={70} />
            </Link> */}
            <button
              onClick={toggleSidebar}
              className="p-4 text-xl text-white bg-gray-80"
            >
              {isOpen ? <FaTimes /> : <FaBars />}
            </button>
            {/* <div className="text-[20px] font-[300]">ICUS</div> */}
          </div>

          <div className="sm:flex hidden gap-[20px]">
            <div>
              <Link
                href="/swap"
                className="hover:text-[#14b9f4] transition-all font-semibold"
              >
                {/* <a className="hover:text-[#14b9f4] transition-all font-semibold"> */}
                Swap
                {/* </a> */}
              </Link>
            </div>

            <div>
              <Link
                href="/liquidity"
                className="hover:text-[#14b9f4] transition-all font-semibold"
              >
                Liquidity
              </Link>
            </div>

            <div>
              <Link
                href="/pool"
                className="hover:text-[#14b9f4] transition-all font-semibold"
              >
                Pools
              </Link>
            </div>
          </div>

          <div>
            <WalletMultiButton style={{ backgroundColor: "purple" }} />
          </div>
        </div>
      </div>

      <div
        className={`fixed top-[10%] z-[1000] rounded-lg left-0 w-64 h-full bg-[#031736] text-white transition-transform transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <Image
                src={logo1}
                alt="logo"
                width={300}
                height={70}
                className=""
              />
        <ul>
          {SideBardata.map((item, index) => {
            return (
              <li key={index}>
                <Link
                  href={item.path}
                  className="hover:bg-[#031736] cursor-pointer   "
                >
                  <div className="text-[#fff] flex items-center cursor-pointer p-[10px_15px] hover:text-[#1ADCAB] rounded-[10px] w-[100%] text-[13px] font-[300]">
                    <span className="mr-[15px] w-[22px] align-middle">
                      {<item.icons />}
                    </span>
                    <span className="">{item.title}</span>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Header;
