import {
  addDays,
  endOfMonth,
  endOfWeek,
  format,
  startOfMonth,
  startOfWeek
} from "date-fns";
import React from "react";

const CalendarDays = ({ currentMonth }: { currentMonth: Date }) => {
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

  for (let i = dayStart; i <= dayEnd; i = addDays(i, 1)) {
    days.push(i);
    // days.push(<li key={i.toString()}>{format(i, "d")}</li>);
  }

  return (
    <ul className="grid grid-cols-7">
      {days.map((day) => (
        <li key={day.toISOString()}>{format(day, "d")}</li>
      ))}
    </ul>
  );
};

export default CalendarDays;
