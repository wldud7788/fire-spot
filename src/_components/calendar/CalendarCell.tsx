import { format } from "date-fns";
import React from "react";
import { CellCard, Schedule } from "./type/schedule.types";
import { getMeetCardStyle } from "./service/calenderService";

type Props = {
  day: Date;
  cellCardList: CellCard[];
};

// 캘린더 한 칸
const CalendarCell = ({ day, cellCardList }: Props) => {
  const showStamp = true;

  if (!cellCardList) {
    cellCardList = [];
  }

  const stampCardList = cellCardList.filter(
    (cellCard) => cellCard.type === "stamp"
  );

  const meetCard = cellCardList.filter(
    (cellCard) => cellCard.type === "meet"
  )[0];

  const meetCardStyle = getMeetCardStyle(meetCard);

  return (
    <li className="flex h-[75px] w-full flex-col border-[1px]">
      <section className="flex h-[20px] w-full justify-end">
        <p>{format(day, "d")}</p>
      </section>
      <section className="relative flex flex-col justify-between">
        <div>
          {meetCard && (
            <div
              // className={`absolute top-2 w-[${(30 * meetCard[0].range).toString()}px] bg-slate-500`}>
              className={`absolute top-2`}
              style={meetCardStyle}
            >
              <div className="w-full bg-slate-500">{meetCard.content}</div>
            </div>
          )}
        </div>
        {/* {showStamp &&
          stampCardList.map((stamp) => (
            <div key={stamp.id} className="bg-slate-500">
              {stamp.content}
            </div>
          ))} */}
      </section>
    </li>
  );
};

export default CalendarCell;
