import React from "react";
import { MeetWithCamp } from "../../types/meet.types";
type Props = {
  meetWithCamp: MeetWithCamp;
};
const MeetSuppliesSection = ({ meetWithCamp }: Props) => {
  const { meet } = meetWithCamp;
  return (
    <div className="mt-12 flex w-full flex-col gap-7">
      <h2 className="text-4xl">준비물</h2>
      <ul className="flex gap-6">
        {meet.supplies.map((item, idx) => (
          <li
            key={idx}
            className="rounded-3xl border-[2px] border-black pb-2 pl-7 pr-7 pt-2"
          >
            <span className="text-xl">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MeetSuppliesSection;
