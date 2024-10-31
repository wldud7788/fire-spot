import React from "react";
import { MeetWithCamp } from "../../types/meet.types";
import { formatDateKr } from "@/_utils/date";
import Slide from "@/_components/slide/Slide";
type Props = {
  meetWithCamp: MeetWithCamp;
  handleAttendPost: () => Promise<void>;
  handleAttendDelete: () => Promise<void>;
  attendButtonValid: {
    isAttendButtonVisible: boolean;
    buttonState: {
      text: string;
      type: "post" | "delete" | "deadline" | "notLoggedIn" | "skelton";
      enabled: boolean;
    };
  };
};
const MeetTitleSection = ({
  meetWithCamp,
  handleAttendPost,
  handleAttendDelete,
  attendButtonValid
}: Props) => {
  const { meet, camp } = meetWithCamp;
  const { buttonState } = attendButtonValid;

  return (
    <div>
      {/* <Slide slidePerview={3}
  spaceBetween={1}
  onChangeEvent={() => {}}>
        {camp.imgUrls.map(url => (
          <img key={url} src={camp.firstImageUrl} alt={`${camp.facltNm} 메인 사진`} />

        ))}
      </Slide> */}
      <h2>{meet.title}</h2>
      <p>{camp.addr1}</p>
      <p>{formatDateKr(meet.start_date)}</p>
      <p>
        {meet.deadline_headcount}명 모집 {meet.attendee_count}/
        {meet.deadline_headcount}
      </p>
      <p>{camp.induty.split(",")}</p>
      <p>당일치기 {meet.is_day_trip.toString()}</p>
      {buttonState.type === "post" && (
        <button className="bg-slate-500" onClick={() => handleAttendPost()}>
          {buttonState.text}
        </button>
      )}
      {buttonState.type === "delete" && (
        <button className="bg-slate-500" onClick={() => handleAttendDelete()}>
          {buttonState.text}
        </button>
      )}
      {buttonState.type === "deadline" && (
        <button className="bg-slate-500" disabled>
          {buttonState.text}
        </button>
      )}
      {buttonState.type === "skelton" && (
        <button
          className="bg-slate-500"
          onClick={() => alert("로그인한 유저만 가능합니다.")}
        >
          신청하기
        </button>
      )}
    </div>
  );
};

export default MeetTitleSection;
