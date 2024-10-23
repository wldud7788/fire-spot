"use client";

import React, { useState } from "react";
import { format, addMonths, subMonths } from "date-fns";
import { startOfMonth, endOfMonth, startOfWeek, endOfWeek } from "date-fns";

const Calendar = () => {
  // 모임 데이터, 스탬프 데이터 불러오기
  // 현재 날짜 구하기
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  // 이전 월
  const prevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };
  // 다음 월
  const nextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };
  // Cell 클릭
  const handleDateClick = (day: Date) => {
    setSelectedDate(day);
  };

  return (
    <div className="flex">
      <div className="">
        <span className="">
          <span className="">{format(currentMonth, "M")}월</span>
          {format(currentMonth, "yyyy")}
        </span>
      </div>
      <div className="flex">
        <div onClick={prevMonth}>{"<="}</div>
        <div onClick={nextMonth}>{"=>"}</div>
      </div>
    </div>
  );
};

export default Calendar;
