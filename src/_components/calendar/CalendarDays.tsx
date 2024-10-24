import {
  addDays,
  endOfMonth,
  endOfWeek,
  format,
  startOfMonth,
  startOfWeek
} from "date-fns";
import React from "react";
import CalendarCell from "./CalendarCell";
import { CellCardTable } from "./type/schedule.types";

const CalendarDays = ({
  currentMonth,
  cellCardTable
}: {
  currentMonth: Date;
  cellCardTable: CellCardTable;
}) => {
  const today = new Date();

  // 이번 달의 시작 일자(요일 등 포함)
  const monthStart = startOfMonth(currentMonth);

  // 이번 달의 시작 일자 기준 주의 시작
  const dayStart = startOfWeek(monthStart);

  // 이번 달의 마지막 일자
  const monthEnd = endOfMonth(currentMonth);

  // 이번 달의 마지막 일자 기준 주의 마지막
  const dayEnd = endOfWeek(monthEnd);

  // dayStart ~ dayEnd 까지 7줄 씩 뿌려주면 됨

  const days = [];

  /**
   * dayStart ~ dayEnd까지 반복
   * 각 요소마다 일자, 그 날의 할일 등에 대한 ..
   *
   */
  for (let i = dayStart; i <= dayEnd; i = addDays(i, 1)) {
    days.push(i);
  }

  return (
    <ul className="grid grid-cols-7">
      {days.map((day) => (
        <CalendarCell
          key={day.toISOString()}
          day={day}
          cellCardList={cellCardTable[format(day, "yyyy-MM-dd")]}
        />
      ))}
    </ul>
  );
};

export default CalendarDays;
