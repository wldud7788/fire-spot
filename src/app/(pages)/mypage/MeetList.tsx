"use client";
import React from "react";
import { useMeetList } from "./hooks/useMeetList";
import MeetCard from "@/_components/meet/MeetCard";
import { convertMeetDataToMeetCard } from "../meets/utils/convertMeetDataToMeetCard";
const MeetList = () => {
  const { meetWithCampList, isProgress, toggleShowType } = useMeetList();
  const meetCardList = convertMeetDataToMeetCard(meetWithCampList, isProgress);

  return (
    <section className="flex w-full items-start gap-[38px]">
      <ul className="w-[67%]">
        {meetCardList.map((meetCard) => (
          <li key={meetCard.id} className="w-full">
            <MeetCard meetCard={meetCard} />
          </li>
        ))}
      </ul>
      <div className="flex w-[37%] flex-col gap-[21px] bg-gray-400">
        <button onClick={toggleShowType}>모집중</button>
      </div>
    </section>
  );
};

export default MeetList;
