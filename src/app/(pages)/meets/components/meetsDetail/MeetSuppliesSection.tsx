import React from "react";
import { MeetWithCamp } from "../../types/meet.types";
type Props = {
  meetWithCamp: MeetWithCamp;
};
const MeetSuppliesSection = ({ meetWithCamp }: Props) => {
  const { meet } = meetWithCamp;
  return (
    <div className="mt-[80px]">
      <h2 className="color-gray01 text-[24px] font-bold">준비물</h2>
      <ul className="mt-[30px] flex flex-wrap items-center gap-[12px]">
        {meet.supplies.map((item, idx) => (
          <li
            key={idx}
            className="min-w-[75px] rounded-[20px] border border-[#a6a6a6] px-[16px] py-[8px] text-center"
          >
            <span className="color-gray01 text-[14px] font-bold">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MeetSuppliesSection;
