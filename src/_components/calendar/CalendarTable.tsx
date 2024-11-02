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
    console.log("id", id);
    setHoverItem(id);
  };

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);

  const dayStart = startOfWeek(monthStart);
  const dayEnd = endOfWeek(monthEnd);

  const days: Date[] = useMemo(() => {
    const dayList = [];
    for (let i = dayStart; i <= dayEnd; i = addDays(i, 1)) {
      dayList.push(i);
    }
    return dayList;
  }, [currentMonth]);

  return (
    <ul className="grid grid-cols-7">
      {days.map((day) => (
        <CalendarCell
          key={day.toISOString()}
          day={day}
          cellCardList={cellCardTable[format(day, "yyyy-MM-dd")]}
          hoverItem={hoverItem}
          handleHoverItem={handleHoverItem}
        />
      ))}
    </ul>
  );
};

export default CalendarTable;
