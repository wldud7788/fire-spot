import React from "react";
import { MeetWithCamp } from "../../types/meet.types";
import { formatDate_3 } from "@/_utils/common/dateFormat";
type Props = {
  meetWithCamp: MeetWithCamp;
};
const MeetIntroSection = ({ meetWithCamp }: Props) => {
  const { camp, meet, attendee_count } = meetWithCamp;
  const campInduty = camp.induty
    ? camp.induty.replaceAll(",", "·")
    : "정보없음";

  return (
    <div className="mt-12 flex w-full flex-col gap-7">
      <section>
        <h2 className="text-4xl">모임 소개</h2>
      </section>
      <section className="flex flex-col gap-5">
        <div className="flex h-[30px] items-center gap-2">
          <div className="h-7 w-7 bg-location bg-cover bg-center" />
          <p className="text-[#757575]">{camp.addr1}</p>
        </div>
        <div className="flex h-[30px] items-center gap-2">
          <div className="h-7 w-7 bg-date bg-cover bg-center" />
          <p className="text-[#A9A9A9]">모임날짜</p>
          <p className="text-[#757575]">{formatDate_3(meet.start_date)}</p>
          {/* <p>신청날짜 ? </p> */}
        </div>
        <div className="flex h-[30px] items-center gap-2">
          <div className="h-7 w-7 bg-avatar bg-cover bg-center" />
          <p className="text-[#A9A9A9]">모집인원</p>
          <p className="text-[#757575]">
            {attendee_count}명 / {meet.deadline_headcount}명 지원
          </p>
        </div>
        <div className="flex h-[30px] items-center gap-2">
          <div className="h-7 w-7 bg-avatar bg-cover bg-center" />
          <p className="text-[#A9A9A9]">캠핑유형</p>
          <p className="text-[#757575]">{campInduty}</p>
        </div>
      </section>

      <section className="flex h-[69px] items-center gap-3 rounded-[14px] border-[2px] border-black pb-5 pl-9 pr-9 pt-5">
        <div className="h-7 w-7 bg-info bg-center bg-no-repeat" />
        <p className="text-lg text-[#757575]">
          개인 계좌 입금 유도, 개인 정보 요구, 초대 멤버가 아닌 외부 인원 초대
          등 가이드를 위반하는 경우 불멍스팟에게 신고해주세요!
        </p>
      </section>
    </div>
  );
};

export default MeetIntroSection;
