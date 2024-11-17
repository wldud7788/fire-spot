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

export type FilterType = "stamp" | "meet" | "all";

const Calendar = () => {
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());
  const [filterType, setFilterType] = useState<FilterType>("all");

  // DDDD

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

    const filterScheduleList = scheduleList.filter((schedule) => {
      if (filterType === "all") return true;
      return schedule.type === filterType;
    });

    return convertScheduleDataToCellCardTable(filterScheduleList);
  }, [scheduleList, filterType]);

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

  const handleFilterType = (type: FilterType) => {
    setFilterType(type);
  };

  const headerProps = {
    currentMonth,
    prevMonth,
    nextMonth,
    filterType,
    handleFilterType
  };

  return (
    <div className="w-full font-pretendard">
      <CalendarHeader {...headerProps} />
      <div className="max-767:overflow-y-auto">
        <CalendarTable
          currentMonth={currentMonth}
          cellCardTable={cellCardTable}
        />
      </div>
    </div>
  );
};

export default Calendar;
