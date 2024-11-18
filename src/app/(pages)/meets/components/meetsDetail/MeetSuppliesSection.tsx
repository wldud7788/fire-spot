import React from "react";
import { MeetWithCamp } from "../../types/meet.types";
type Props = {
  meetWithCamp: MeetWithCamp;
};
const MeetSuppliesSection = ({ meetWithCamp }: Props) => {
  const { meet } = meetWithCamp;
  return (
    <div className="mt-[80px] max-989:mt-[60px]">
      <h2 className="color-gray01 text-[24px] font-bold max-1280:text-[20px] max-1160:text-[18px]">
        준비물
      </h2>
      <ul className="mt-[30px] flex flex-wrap items-center gap-[12px] max-767:mt-[20px]">
        {meet.supplies.map((item, idx) => (
          <li
            key={idx}
            className="min-w-[75px] rounded-[20px] border border-[#a6a6a6] px-[16px] py-[8px] text-center max-1280:px-[15px] max-1280:py-[7px] max-989:px-[12px] max-989:py-[5px]"
          >
            <span className="color-gray01 text-[14px] font-bold">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MeetSuppliesSection;
