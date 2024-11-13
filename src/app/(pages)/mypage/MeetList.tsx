"use client";
import React from "react";
import { useMeetList } from "./hooks/useMeetList";
import MeetCard from "@/_components/meet/MeetCard";
import { convertMeetDataToMeetCard } from "../meets/utils/convertMeetDataToMeetCard";
import NoData from "@/_components/common/NoData";
const MeetList = () => {
  const { meetWithCampList, isProgress, toggleShowType } = useMeetList();
  const meetCardList = convertMeetDataToMeetCard(meetWithCampList, isProgress);

  return (
    <div className="flex flex-col">
      <div className="mb-[40px] flex items-center">
        <button
          className="rounded-[2px] border border-[#D9D9D9] p-[10px] text-[12px] text-[#737373]"
          onClick={() => toggleShowType(true)}
        >
          모집중
        </button>
        <button
          className="ml-[-1px] rounded-[2px] border border-[#D9D9D9] p-[10px] text-[12px] text-[#737373]"
          onClick={() => toggleShowType(false)}
        >
          마감
        </button>
      </div>

      {meetCardList ? (
        <section className="flex w-full">
          <ul className="flex w-full flex-col items-center gap-[15px]">
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
      ) : (
        <NoData text="참여한 모임이 없어요" />
      )}
    </div>
  );
};

export default MeetList;
