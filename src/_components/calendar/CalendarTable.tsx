import {
  addDays,
  endOfMonth,
  endOfWeek,
  format,
  startOfMonth,
  startOfWeek
} from "date-fns";
import React, { useMemo, useState } from "react";
import CalendarCell from "./CalendarCell";
import { CellCardTable } from "./type/schedule.types";

const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];

// CalendarTable로 이름 변경
const CalendarTable = ({
  currentMonth,
  cellCardTable
}: {
  currentMonth: Date;
  cellCardTable: CellCardTable;
}) => {
  const [hoverItem, setHoverItem] = useState("");

  const handleHoverItem = (id: string) => {
    setHoverItem(id);
  };

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);

  const dayStart = startOfWeek(monthStart);
  const dayEnd = endOfWeek(monthEnd);

  const dates: Date[] = useMemo(() => {
    const dayList = [];
    for (let i = dayStart; i <= dayEnd; i = addDays(i, 1)) {
      dayList.push(i);
    }
    return dayList;
  }, [currentMonth]);

  return (
    <div className="mt-[20px] rounded-[15px] border border-[#BFBFBF] bg-[#FFF] px-[21.5px] py-[16.5px]">
      <section className="pb-[8px] pt-[16px]">
        <ul className="grid grid-cols-7 gap-[7px]">
          {days.map((day) => (
            <li key={day} className="flex w-full justify-center">
              <span className="color-gray01 text-[16px] font-medium">
                {day}
              </span>
            </li>
          ))}
        </ul>
      </section>
      <ul className="grid grid-cols-7 gap-[7px]">
        {dates.map((day) => (
          <CalendarCell
            key={day.toISOString()}
            day={day}
            cellCardList={cellCardTable[format(day, "yyyy-MM-dd")]}
            hoverItem={hoverItem}
            handleHoverItem={handleHoverItem}
          />
        ))}
      </ul>
    </div>
  );
};

export default CalendarTable;
