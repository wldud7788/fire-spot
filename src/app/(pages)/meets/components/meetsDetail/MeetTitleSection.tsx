import React from "react";
import { MeetWithCamp } from "../../types/meet.types";
import { formatDateKr } from "@/_utils/date";
type Props = {
  meetWithCamp: MeetWithCamp;
  attendButtonValid: {
    isAttendButtonVisible: boolean;
    buttonState: { text: string; type: string };
  };
};
const MeetTitleSection = ({ meetWithCamp, attendButtonValid }: Props) => {
  const { meet, camp } = meetWithCamp;
  const { isAttendButtonVisible, buttonState } = attendButtonValid;

  console.log("buttonState", buttonState);

  // TODO firstImageUrl 제외한 사진도 upsert 해주자
  return (
    <div>
      <img src={camp.firstImageUrl} alt={`${camp.facltNm} 메인 사진`} />
      <h2>{meet.title}</h2>
      <p>{camp.addr1}</p>
      <p>{formatDateKr(meet.start_date)}</p>
      <p>
        {meet.deadline_headcount}명 모집 {meet.attendee_count}/
        {meet.deadline_headcount}
      </p>
      <p>{camp.induty.split(",")}</p>
      <p>당일치기 {meet.is_day_trip.toString()}</p>
      {buttonState.type !== "skelton" && isAttendButtonVisible && (
        <button className="bg-slate-500">참여하기</button>
      )}
    </div>
  );
};

export default MeetTitleSection;
