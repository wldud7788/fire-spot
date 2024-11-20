import React from "react";
import { format } from "date-fns";
import { CALENDAR_FILTER, FilterType } from "./Calendar";

type Props = {
  currentMonth: Date;
  prevMonth: () => void;
  nextMonth: () => void;
  filterType: FilterType;
  handleFilterType: (type: FilterType) => void;
};

const CalendarHeader = ({
  currentMonth,
  prevMonth,
  nextMonth,
  filterType,
  handleFilterType
}: Props) => {
  return (
    <div className="w-full">
      <section className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h3 className="text-[16px]">
            {format(currentMonth, "yyyy")}년 {format(currentMonth, "M")}월
          </h3>
          <div className="flex">
            <button
              onClick={prevMonth}
              className="flex h-[28px] w-[25px] border border-[#C9C9C9] bg-calendarPrev bg-center bg-no-repeat"
            ></button>
            <button
              onClick={nextMonth}
              className="flex h-[28px] w-[25px] border border-[#C9C9C9] bg-calendarNext bg-center bg-no-repeat"
            ></button>
          </div>
        </div>
        <div className="flex gap-[1px]">
          <button
            className={`rounded-[2px] border border-[#D9D9D9] p-[10px] text-[12px] text-[#737373] ${filterType === CALENDAR_FILTER.all && "bg-main bd-color-main text-white"}`}
            onClick={() => handleFilterType(CALENDAR_FILTER.all)}
          >
            같이 보기
          </button>
          <button
            className={`ml-[-1px] rounded-[2px] border border-[#D9D9D9] p-[10px] text-[12px] text-[#737373] ${filterType === CALENDAR_FILTER.stamp && "bg-main bd-color-main text-white"}`}
            onClick={() => handleFilterType(CALENDAR_FILTER.stamp)}
          >
            후기
          </button>
          <button
            className={`ml-[-1px] rounded-[2px] border border-[#D9D9D9] p-[10px] text-[12px] text-[#737373] ${filterType === CALENDAR_FILTER.meet && "bg-main bd-color-main text-white"}`}
            onClick={() => handleFilterType(CALENDAR_FILTER.meet)}
          >
            모임
          </button>
        </div>
      </section>
    </div>
  );
};

export default CalendarHeader;
