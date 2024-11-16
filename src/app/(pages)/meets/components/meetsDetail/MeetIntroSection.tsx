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
    <div className="mt-[80px] w-full max-989:mt-[60px]">
      <h2 className="mb-[35px] text-[24px] font-bold max-1280:text-[20px] max-1160:text-[18px] max-767:mb-[20px]">
        모임일정
      </h2>
      <div className="flex flex-col items-start justify-start gap-[12px]">
        <div className="flex items-center">
          <p className="color-gray02 meet-text-line relative mr-[13px] bg-meetLocation bg-left-center-0 bg-no-repeat pl-[36px] pr-[13px]">
            <span className="inline-block w-[60px] text-justify text-[16px] font-bold max-1280:text-[14px] max-767:text-[13px]">
              장소
            </span>
          </p>
          <p className="color-gray02 text-[16px] max-1280:text-[14px] max-767:text-[13px]">
            {camp.addr1}
          </p>
        </div>
        <div className="flex items-center">
          <p className="color-gray02 meet-text-line relative mr-[13px] bg-meetCalendar bg-left-center-0 bg-no-repeat pl-[36px] pr-[13px]">
            <span className="inline-block w-[60px] text-justify text-[16px] font-bold max-1280:text-[14px] max-767:text-[13px]">
              모임날짜
            </span>
          </p>
          <p className="color-gray02 text-[16px] max-1280:text-[14px] max-767:text-[13px]">
            {formatDate_3(meet.start_date)}
          </p>
        </div>
        <div className="flex items-center">
          <p className="color-gray02 meet-text-line relative mr-[13px] bg-meetAvatar bg-left-center-0 bg-no-repeat pl-[36px] pr-[13px]">
            <span className="inline-block w-[60px] text-justify text-[16px] font-bold max-1280:text-[14px] max-767:text-[13px]">
              모집인원
            </span>
          </p>
          <p className="color-gray02 text-[16px] max-1280:text-[14px] max-767:text-[13px]">
            {attendee_count}명 / {meet.deadline_headcount}명 지원
          </p>
        </div>
        <div className="flex items-center">
          <p className="color-gray02 meet-text-line relative mr-[13px] bg-meetCategory bg-left-center-0 bg-no-repeat pl-[36px] pr-[13px]">
            <span className="inline-block w-[60px] text-justify text-[16px] font-bold max-1280:text-[14px] max-767:text-[13px]">
              캠핑유형
            </span>
          </p>
          <p className="color-gray02 text-[16px] max-1280:text-[14px] max-767:text-[13px]">
            {campInduty}
          </p>
        </div>
        <p className="bg-center-left-0 bg-meetImport bg-no-repeat pl-[28px] text-[16px] text-[#a6a6a6] max-1280:text-[14px] max-767:text-[13px]">
          개인 계좌 입금 유도, 개인 정보 요구, 초대 멤버가 아닌 외부 인원 초대
          등 가이드를 위반하는 경우 불멍스팟에게 신고해주세요!
        </p>
      </div>
    </div>
  );
};

export default MeetIntroSection;
