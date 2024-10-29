import React, { useState } from "react";
import { setHours, setMinutes } from "date-fns";

const useDate = () => {
  const now = new Date();
  const currentMinutes = now.getMinutes();
  const adjustedMinutes = currentMinutes < 30 ? 0 : 30;

  const [date, setDate] = useState<Date>(
    setMinutes(setHours(now, now.getHours()), adjustedMinutes)
  );

  return [date, setDate] as const; // TypeScript에서 읽기 전용 배열로 반환
};

export default useDate;
