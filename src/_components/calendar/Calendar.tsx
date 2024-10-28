"use client";

import React, { useMemo, useState } from "react";
import { addMonths, subMonths } from "date-fns";
import CalendarHeader from "./CalendarHeader";
import CalendarTable from "./CalendarTable";
import { getScheduleList } from "./action/calendarAction";
import { queryKey } from "./hook/queryKey";
import { useQuery } from "@tanstack/react-query";
import { CellCardTable, Schedule } from "./type/schedule.types";
import { convertScheduleDataToCellCardTable } from "./utils/calenderService";

const Calendar = () => {
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());
  // TODO 실제 데이터로 변경되면 훅 분리하기
  // 뭔가 이름을 통해 명확하게 가져오면 좋을 것 같음.
  const { data: scheduleList } = useQuery<Schedule[]>({
    queryFn: () => getScheduleList(),
    queryKey: queryKey.calendar.schedule("testUser")
  });

  // scheduleList가 변경되지 않는다면 리렌더링이 되더라도 값을 새로 할당하지 않음
  const cellCardTable: CellCardTable | null = useMemo(() => {
    if (!scheduleList) {
      return null; // 또는 원하는 초기값
    }
    return convertScheduleDataToCellCardTable(scheduleList);
  }, [scheduleList]);

  if (!cellCardTable) {
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

  return (
    <div className="w-full">
      <CalendarHeader {...headerProps} />
      <CalendarTable
        currentMonth={currentMonth}
        cellCardTable={cellCardTable}
      />
    </div>
  );
};

export default Calendar;
