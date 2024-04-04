import Link from "next/link";
import { FC, ReactNode } from "react";
import { SideBardata } from "../SidebarData";

interface ComponentProps {
  children: ReactNode
  isOpen: boolean;
}

const Sidebar: FC< ComponentProps> = ({ children,isOpen }) => {
  return (
    <div className="flex ">
      
      <div className="bg-[#031736] h-[90vh] w-[15%]  z-[100]">
        <nav>
          <ul >
            {SideBardata.map((item, index) => {
              return (
                <li
                  key={index}
                  
                >
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
        </nav>
      </div>
      {children}
    </div>
  );
};

export default Sidebar;
