import React from "react";
import { MeetWithCamp } from "../../types/meet.types";
type Props = {
  meetWithCamp: MeetWithCamp;
};
const MeetContentSection = ({ meetWithCamp }: Props) => {
  const { meet } = meetWithCamp;
  return (
    <div className="mt-10">
      <h3>모임장 한 마디</h3>
      <div>유저 카드</div>
      <pre>{meet.content}</pre>
    </div>
  );
};

export default MeetContentSection;
