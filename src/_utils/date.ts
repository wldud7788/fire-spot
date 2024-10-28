import { format } from "date-fns";
import { ko } from "date-fns/locale"; // 한국어 로케일

// M월 d일
const formatDateKr = (date: Date | string) => {
  return format(date, "M'월' d'일'", { locale: ko });
};

const formatFullDateKr = (date: Date | string) => {
  return format(date, "yy'년' M'월' d'일' (eee) a h:mm", { locale: ko });
};

export { formatDateKr, formatFullDateKr };
