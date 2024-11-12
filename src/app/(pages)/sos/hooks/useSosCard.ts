import { useEffect, useState } from "react";
import { addHours, Duration, intervalToDuration } from "date-fns";

const initialDuration = {
  hours: 0,
  minutes: 0,
  seconds: 0
} as Duration;

const useSosCard = (date: Date) => {
  const [timeRemaining, setTimeRemaining] = useState<Duration>(initialDuration);

  useEffect(() => {
    // sos.created_at에 3시간 더한 endTime 계산
    const createdAt = new Date(date);
    const endTime = addHours(createdAt, 3);

    // 1초마다 현재 시간을 갱신하고, 남은 시간 계산
    const intervalId = setInterval(() => {
      const currentTime = new Date();
      const remainingTime = intervalToDuration({
        start: currentTime,
        end: endTime
      });

      setTimeRemaining(remainingTime);

      // 만약 시간이 다 되면 interval을 클리어
      if (currentTime >= endTime) {
        clearInterval(intervalId);
      }
    }, 1000); // 1초마다 갱신

    // 컴포넌트 언마운트 시 interval 정리
    return () => clearInterval(intervalId);
  }, [date]);

  const { hours = 0, minutes = 0, seconds = 0 } = timeRemaining;

  const remainingTimeString = `${String(hours > 0 ? hours : 0).padStart(2, "0")} : ${String(minutes > 0 ? minutes : 0).padStart(2, "0")} : ${String(seconds > 0 ? seconds : 0).padStart(2, "0")}`;

  const isProgress = hours > 0 || minutes > 0 || seconds > 0;

  return { isProgress, remainingTimeString };
};

export default useSosCard;
