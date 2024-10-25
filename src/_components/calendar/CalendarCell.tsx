import { format } from "date-fns";
import React from "react";
import { CellCard, Schedule } from "./type/schedule.types";

type Props = {
  day: Date;
  cellCardList: CellCard[];
};

// 캘린더 한 칸
const CalendarCell = ({ day, cellCardList }: Props) => {
  return (
    <li className="flex w-full flex-col border-[1px]">
      <section className="flex h-[20px] w-full justify-end">
        <p>{format(day, "d")}</p>
      </section>
      <section className="flex flex-col">
        {cellCardList &&
          cellCardList.map((cellCard) => (
            <div key={cellCard.id} className="bg-slate-500">
              {cellCard.content}
            </div>
          ))}
      </section>
    </li>
  );
};

export default CalendarCell;
