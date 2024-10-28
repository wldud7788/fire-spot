import React from "react";
import { MeetWithCamp } from "../../types/meet.types";
import { formatDateKr, formatFullDateKr } from "@/_utils/date";
type Props = {
  meetWithCamp: MeetWithCamp;
};
const MeetIntroSection = ({ meetWithCamp }: Props) => {
  const { camp, meet } = meetWithCamp;
  return (
    <div className="mt-10">
      <h3>모임 소개</h3>
      <p>{camp.addr1}</p>
      <p>모임날짜 {formatFullDateKr(meet.start_date)}</p>
      <p>신청날짜 ? </p>
      <p>
        모집인원 {meet.attendee_count}명/{meet.deadline_headcount}명 지원
      </p>
      <p>캠핑유형 {camp.induty.replaceAll(",", "·")}</p>
      <div>
        <p>
          개인 계좌 입금 유도, 개인 정보 요구, 초대 멤버가 아닌 외부 인원 초대
          등 가이드를 위반하는 경우 불멍스팟에게 신고해주세요!
        </p>
      </div>
    </div>
  );
};

export default MeetIntroSection;
