import React from "react";
import WriteButton from "./components/meets/WriteButton";
import { MeetWithCamp } from "./types/meet.types";
import { fetchMeetList } from "./actions/meetListAction";
import { Metadata } from "next";
import MeetCard from "@/_components/meet/MeetCard";
import { convertMeetDataToMeetCard } from "./utils/convertMeetDataToMeetCard";
import Link from "next/link";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "불멍스팟",
    description: "불멍스팟 모임 목록 페이지"
  };
}

const Meets = async () => {
  const meetWithCampList: MeetWithCamp[] = await fetchMeetList();

  const meetCardList = convertMeetDataToMeetCard(meetWithCampList);

  return (
    <div className="relative mx-auto w-full max-w-[1360px] px-[30px]">
      <div className="absolute right-[30px] top-4 h-[40px]">
        <WriteButton>작성으로 가자</WriteButton>
      </div>
      <ul className="mt-[40px] flex flex-wrap justify-center gap-[23px]">
        {meetCardList.map((meetCard) => (
          <li key={meetCard.id} className="w-[44%]">
            {" "}
            {/* 각 아이템을 50% 너비로 설정 */}
            <MeetCard meetCard={meetCard} />
          </li>
        ))}
      </ul>
      {/* <ul className="grid grid-cols-3">
        {meetCardList.map((meetCard) => (
          <li key={meetCard.id}>
            <MeetCard meetCard={meetCard} />
          </li>
        ))}
      </ul> */}
    </div>
  );
};

export default Meets;
