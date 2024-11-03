import { format } from "date-fns";
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

export { formatDate_1, formatDate_2, formatDate_3, formatDate_4 };
