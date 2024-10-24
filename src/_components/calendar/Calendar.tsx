"use client";

import React, { useState } from "react";
import { format, addMonths, subMonths } from "date-fns";
import { startOfMonth, endOfMonth, startOfWeek, endOfWeek } from "date-fns";
import CalendarHeader from "./CalendarHeader";
import CalendarDays from "./CalendarDays";
import { getScheduleList } from "./action/calendarAction";
import { queryKey } from "./hook/queryKey";
import { useQuery } from "@tanstack/react-query";
import { CellCard, CellCardTable, Schedule } from "./type/schedules";
import { convertScheduleListToCellCardTable } from "./service/calenderService";

const Calendar = () => {
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());
  const { data: scheduleList, isPending } = useQuery<Schedule[]>({
    queryFn: () => getScheduleList(),
    queryKey: queryKey.calendar.schedule("testUser")
  });

  if (isPending || !scheduleList) {
    return <></>;
  }
  const cellCardTable = convertScheduleListToCellCardTable(scheduleList);

  // 이전 월
  const prevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };
  // 다음 월
  const nextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };

  const headerProps = {
    currentMonth,
    prevMonth,
    nextMonth
  };

  return (
    <div className="w-[500px]">
      <CalendarHeader {...headerProps} />
      {/* <CalendarDays currentMonth={currentMonth} /> */}
    </div>
  );
};

export default Calendar;
