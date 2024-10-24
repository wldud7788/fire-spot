import React from "react";
import { format } from "date-fns";

type Props = {
  currentMonth: Date;
  prevMonth: () => void;
  nextMonth: () => void;
};

const CalendarHeader = ({ currentMonth, prevMonth, nextMonth }: Props) => {
  const days = ["일", "월", "화", "수", "목", "금", "토"];
  return (
    <div className="w-full">
      <section className="flex">
        <div className="">
          <span className="">
            {format(currentMonth, "yyyy")}년 {format(currentMonth, "M")}월
          </span>
        </div>
        <div className="flex">
          <div onClick={prevMonth}>{"<="}</div>
          <div onClick={nextMonth}>{"=>"}</div>
        </div>
      </section>
      <section>
        <ul className="grid grid-cols-7">
          {days.map((day) => (
            <li key={day} className="flex w-full justify-center bg-slate-300">
              <span>{day}</span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default CalendarHeader;
