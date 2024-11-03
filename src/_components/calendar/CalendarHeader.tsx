import React from "react";
import { format } from "date-fns";
import { FilterType } from "./Calendar";

type Props = {
  currentMonth: Date;
  prevMonth: () => void;
  nextMonth: () => void;
  handleFilterType: (type: FilterType) => void;
};

const CalendarHeader = ({
  currentMonth,
  prevMonth,
  nextMonth,
  handleFilterType
}: Props) => {
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  return (
    <div className="p w-full">
      <section className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h3 className="w-28 text-[20px]">
            {format(currentMonth, "yyyy")}년 {format(currentMonth, "M")}월
          </h3>
          <div className="flex">
            <button
              onClick={prevMonth}
              className="flex h-[22px] w-[15px] items-center justify-center border-[0.5px] border-[#C9C9C9] bg-[#D9D9D9]"
            >
              <div className="h-[21px] w-[18px] bg-prev bg-cover bg-center" />
            </button>
            <button
              onClick={nextMonth}
              className="flex h-[22px] w-[15px] items-center justify-center border-[0.5px] border-[#C9C9C9] bg-[#D9D9D9]"
            >
              <div className="h-[21px] w-[18px] bg-next bg-cover bg-center" />
            </button>
          </div>
        </div>
        <div className="flex">
          <button
            className="flex items-center justify-center border-[0.5px] border-[#C9C9C9] bg-[#D9D9D9] px-2"
            onClick={() => handleFilterType("all")}
          >
            같이 보기
          </button>
          <button
            className="flex items-center justify-center border-[0.5px] border-[#C9C9C9] bg-[#D9D9D9] px-2"
            onClick={() => handleFilterType("stamp")}
          >
            후기
          </button>
          <button
            className="flex items-center justify-center border-[0.5px] border-[#C9C9C9] bg-[#D9D9D9] px-2"
            onClick={() => handleFilterType("meet")}
          >
            모임
          </button>
        </div>
      </section>
      <section>
        <ul className="grid grid-cols-7">
          {days.map((day) => (
            <li key={day} className="flex w-full justify-center">
              <span>{day}</span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default CalendarHeader;
