import React from "react";

interface Prop {
  quarter: string;
  date: string;
  children: JSX.Element;
}

const RoadmapProp = ({ quarter, date, children }: Prop) => {
  return (
    <div className="relative  mb-[40px] ">
      <div className="absolute md:left-[-88px] md:top-[4px] top-0 left-[-55px] w-[36px] h-[36px] text-[16px] md:text-[20px] text-center flex justify-center items-center shadow-[7px_3px_14px_-3px_rgb(255,255,255,0.32)] bg-[#0761d7] md:w-[50px] md:h-[50px] rounded-[50%]">
        {quarter}
      </div>
      <div className=" text-start font-[400] bg-[#5b44b0] rounded-[3px] shadow-[1px_2px_9px_rgba(0,0,0,0.1)] text-[16px] px-[20px] pt-[20px] pb-[15px]">
        <h4 className="text-[calc(1.275rem+0.3vw)] font-[500]  mb-[22.4px] leading-[28.8px]">
          <span className="inline-block whitespace-nowrap bg-[#5b44b0] rounded-[3px] text-[#fff] leading-[18px]  px-[8px] py-[4px] text-[18px] text-center font-[400] align-baseline">
            {date}
          </span>
        </h4>
        <ul className="mb-[16px] pl-[32px] leading-[24px] list-disc">
          {children}
        </ul>
      </div>
    </div>
  );
};

export default RoadmapProp;
