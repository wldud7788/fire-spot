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
  // TODO 민규님: SOS 목록의 카드
  return (
    <div className="w-full rounded-[20px] bg-[#F4F4F4] px-[30px] py-[25px]">
      <div className="inner">
        <div className="utils flex items-center justify-between">
          <ul className="flex gap-[10px]">
            {/* isProgress 종료여부 boolean */}
            {isProgress && "진행중"}
            {!isProgress && "종료됨"}

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
        <Link
          href={SERVER_PAGE_URL.sosDetail(sos.id.toString())}
          className="mb-[10px] mt-[10px] block text-[30px] font-medium"
        >
          {/* sos 제목 */}
          {sos.title}
        </Link>
        <div className="info flex gap-[20px]">
          <p className="bg-location bg-left-center-0 bg-no-repeat pl-[20px] text-[16px]">
            {/* 시군구 명 */}
            {camp.sigunguNm}
          </p>
          {/* 남은 시간 */}
          <p>{remainingTimeString}</p>
        </div>
      </div>
    </div>
  );
};

export default SosCard;