import React from "react";
import WriteButton from "./components/meets/WriteButton";
import { MeetWithCamp } from "./types/meet.types";
import { getMeetList } from "./actions/meetListAction";
import { Metadata } from "next";
import MeetCard from "@/_components/meet/MeetCard";
import { convertMeetDataToMeetCard } from "./utils/convertMeetDataToMeetCard";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "불멍스팟",
    description: "불멍스팟 모임 목록 페이지"
  };
}

const Meets = async () => {
  const meetWithCampList: MeetWithCamp[] = await getMeetList();

  const meetCardList = convertMeetDataToMeetCard(meetWithCampList);

  // console.log("meetCardList", meetCardList);

  return (
    <div className="relative">
      <div className="absolute left-4 top-4">
        <WriteButton>작성으로 가자</WriteButton>
      </div>
      <ul className="grid grid-cols-3">
        {meetCardList.map((meetCard) => (
          <li key={meetCard.id}>
            <MeetCard meetCard={meetCard} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Meets;
