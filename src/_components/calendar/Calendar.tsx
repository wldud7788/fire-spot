"use client";

import React, { useMemo, useState } from "react";
import { addMonths, subMonths } from "date-fns";
import CalendarHeader from "./CalendarHeader";
import CalendarDays from "./CalendarDays";
import { getScheduleList } from "./action/calendarAction";
import { queryKey } from "./hook/queryKey";
import { useQuery } from "@tanstack/react-query";
import { CellCardTable, Schedule } from "./type/schedule.types";
import { convertScheduleListToCellCardTable } from "./service/calenderService";

const Calendar = () => {
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());
  const { data: scheduleList, isPending } = useQuery<Schedule[]>({
    queryFn: () => getScheduleList(),
    queryKey: queryKey.calendar.schedule("testUser")
  });

  const cellCardTable: CellCardTable | null = useMemo(() => {
    if (!scheduleList) {
      return null; // 또는 원하는 초기값
    }
    return convertScheduleListToCellCardTable(scheduleList);
  }, [scheduleList]);

  if (isPending || !cellCardTable) {
    return <></>;
  }

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

  console.log("cellCardTable", cellCardTable);

  return (
    <div className="w-full">
      <CalendarHeader {...headerProps} />
      <CalendarDays currentMonth={currentMonth} cellCardTable={cellCardTable} />
    </div>
  );
};

export default Calendar;
