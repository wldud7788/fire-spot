import React from "react";
import { MeetWithCamp } from "../../types/meet.types";
type Props = {
  meetWithCamp: MeetWithCamp;
};
const MeetSuppliesSection = ({ meetWithCamp }: Props) => {
  const { meet } = meetWithCamp;
  return (
    <div className="mt-10">
      <h3>준비물</h3>
      <ul className="flex gap-4">
        {meet.supplies.map((item, idx) => (
          <li key={idx}>{item}</li>
        ))}
      </ul>
    </div>
  );
};

export default MeetSuppliesSection;
