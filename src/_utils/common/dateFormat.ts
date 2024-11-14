import { differenceInDays, differenceInHours, format } from "date-fns";
import { ko } from "date-fns/locale";

/** date -> 10.30(수) */
const formatDate_1 = (date: Date | string) => {
  return format(date, "MM.dd") + `(${format(date, "E", { locale: ko })})`;
};

/** date -> 10월 31일 */
const formatDate_2 = (date: Date | string) => {
  return format(date, "M'월' d'일'", { locale: ko });
};

/** date -> 24년 10월 31일 (목) 오후 9:43 */
const formatDate_3 = (date: Date | string) => {
  return format(date, "yy'년' M'월' d'일' (eee) a h:mm", { locale: ko });
};

/** date -> 10월 25일 · 8시30분 */
const formatDate_4 = (date: Date | string) => {
  return format(date, "M월 d일 '·' h시 m분", { locale: ko });
};

/** date -> n시간 전, 1일 이상 전 일경우 yyyy-MM-dd */
const formatDate_5 = (date: Date | string) => {
  const now = new Date();
  const timeDifferenceInHours = differenceInHours(now, date); // 현재 시간과의 시간 차이
  const timeDifferenceInDays = differenceInDays(now, date); // 현재 시간과의 일 차이

  if (timeDifferenceInHours < 24) {
    // 24시간 이내라면 "n시간 전" 형식
    return `${timeDifferenceInHours}시간 전`;
  }
  // 1일 이상 경과했으면, "yyyy-MM-dd" 형식으로 날짜 표시
  return format(date, "yyyy-MM-dd");
};

/** date -> 오후 12:05 */
const formatDate_6 = (date: Date | string) => {
  return format(date, "aa hh:mm", {
    locale: ko
  });
};

export {
  formatDate_1,
  formatDate_2,
  formatDate_3,
  formatDate_4,
  formatDate_5,
  formatDate_6
};
