import React from "react";
import { MeetWithCamp } from "../../types/meet.types";
type Props = {
  meetAndCamp: MeetWithCamp;
};
const MeetTitleSection = ({ meetAndCamp }: Props) => {
  const { meet, camp } = meetAndCamp;

  return (
    <div>
      <h2>{meet.title}</h2>
      <p>{camp.addr1}</p>
      <p>{meet.start_date}</p>
      {/* <p>{meetDetail.}/{meetDetail.deadline_headcount}</p> */}
    </div>
  );
};

export default MeetTitleSection;
