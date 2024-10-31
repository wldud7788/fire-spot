import React, { useState } from "react";
import { setHours, setMinutes } from "date-fns";

const useDate = (initialDate: Date) => {
  const now = new Date(initialDate);
  const currentMinutes = now.getMinutes();
  const adjustedMinutes = currentMinutes < 30 ? 0 : 30;

  const [date, setDate] = useState<Date>(
    setMinutes(setHours(now, now.getHours()), adjustedMinutes)
  );

  const handleSetDate = (newDate: Date) => {
    const newCurrentMinutes = newDate.getMinutes();
    const newAdjustedMinutes = newCurrentMinutes < 30 ? 0 : 30;

    const adjustedDate = setMinutes(
      setHours(newDate, newDate.getHours()),
      newAdjustedMinutes
    );
    setDate(adjustedDate);
  };

  return [date, handleSetDate] as const; // TypeScript에서 읽기 전용 배열로 반환
};

export default useDate;
