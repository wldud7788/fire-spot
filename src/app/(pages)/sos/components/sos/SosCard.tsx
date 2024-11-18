"use client";
import Link from "next/link";
import { SosWithCamp } from "../../types/sos.types";
import { SERVER_PAGE_URL } from "@/_utils/common/constant";
import useSosRemainingTime from "../../hooks/useSosRemainingTime";

type Props = {
  sosWithCamp: SosWithCamp;
};

const SosCard = ({ sosWithCamp }: Props) => {
  const { sos, camp } = sosWithCamp;

  const { isProgress, remainingTimeString } = useSosRemainingTime(
    new Date(sos.created_at)
  );

  return (
    <div
      className={`w-full rounded-[16px] border border-[#a6a6a6] px-[30px] py-[22px] max-767:px-[20px] max-767:py-[15px] ${isProgress ? "bg-white" : "bg-[#F2F2F2]"}`}
    >
      <div className="inner">
        <div className="utils flex items-center justify-between">
          <ul className="flex gap-[10px]">
            {/* isProgress 종료여부 boolean */}
            <span
              className={`max-767:py-[3px] max-767:text-[11px] ${isProgress ? "bg-[#FFB180] text-[#B24600]" : "bg-[#d9d9d9] text-[#737373]"} rounded-[50px] px-[15px] py-[5px] text-[14px]`}
            >
              {isProgress && "진행중"}
              {!isProgress && "종료됨"}
            </span>

            {/* 피그마 기준 진행중, 종료됨만 나와서 일단 주석처리 해놨습니다. 다른 tag 데이터입니다. (캠핑질문, 긴급 등 ...) */}
            {/* {sos.tag.map((tag) => {
              return (
                <li
                  key={tag}
                  className="rounded-[15px] bg-[#D9D9D9] px-[15px] py-[3px] text-[15px]">
                  {tag}
                </li>
              );
            })} */}
          </ul>
        </div>
        <div className="flex items-center justify-between gap-[15px]">
          <Link
            href={SERVER_PAGE_URL.sosDetail(sos.id.toString())}
            className="my-[14px] line-clamp-1 block w-[calc(100%-91px)] pr-[20px] text-[16px] font-medium max-767:w-[calc(100%-61px)] max-767:text-[14px]"
          >
            {/* sos 제목 */}
            {sos.title}
          </Link>
          <p className="color-gray02 w-[91px] flex-none text-[18px] max-767:w-[61px] max-767:text-[12px]">
            {remainingTimeString}
          </p>
        </div>

        <div className="info flex gap-[20px]">
          <p className="bg-location bg-left-center-0 bg-no-repeat pl-[20px] text-[16px] max-1280:text-[12px]">
            {/* 시군구 명 */}
            {camp.sigunguNm}
          </p>
          {/* 남은 시간 */}
        </div>
      </div>
    </div>
  );
};

export default SosCard;
