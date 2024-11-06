"use client";
import React from "react";
import { useMeetList } from "./hooks/useMeetList";
import MeetCard from "@/_components/meet/MeetCard";
import { convertMeetDataToMeetCard } from "../meets/utils/convertMeetDataToMeetCard";
const MeetList = () => {
  const { meetWithCampList, isProgress, toggleShowType } = useMeetList();
  const meetCardList = convertMeetDataToMeetCard(meetWithCampList, isProgress);

  return (
    <div className="flex flex-col">
      <div className="flex w-[37%] items-center justify-center gap-[21px]">
        <button onClick={() => toggleShowType(true)}>모집중</button>
        <button onClick={() => toggleShowType(false)}>마감</button>
      </div>

      <section className="flex w-full items-start gap-[38px]">
        <ul className="w-[67%]">
          {meetCardList.map((meetCard) => (
            <li key={meetCard.id} className="w-full">
              <MeetCard meetCard={meetCard} />
            </li>
          ))}
        </ul>
        {/* <div className="flex w-[37%] flex-col gap-[21px] bg-gray-400">
          <button onClick={toggleShowType}>모집중</button>
        </div> */}
      </section>
    </div>
  );
};

export default MeetList;
