import React from "react";
import { Meet } from "../../types/meet.types";
type Props = {
  meetDetail: Meet;
};
const MeetTitleSection = ({ meetDetail }: Props) => {
  return (
    <div>
      <h2>{meetDetail.title}</h2>
      <p>{meetDetail.camp.addr1}</p>
      <p>{meetDetail.start_date}</p>
      {/* <p>{meetDetail.}/{meetDetail.deadline_headcount}</p> */}
    </div>
  );
};

export default MeetTitleSection;
