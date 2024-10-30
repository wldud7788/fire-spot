import { format, parse } from "date-fns";
import { ko } from "date-fns/locale";

/**
 * Date 자료형 포맷 함수 목록
 * 포맷 유형이 너무 다양해서 함수명을 어떻게 지어야할지... 그냥 숫자로 구분하고 주석을 달면 어떨까요?
 *
 * + 현재 캘린더, 모임 쪽에 Date 포맷 코드가 여럿 있는데 추후 옮기도록 하겠습니다.
 */

/** date -> 10.30(수) */
const getFormatDate_1 = (date: Date | string) => {
  return format(date, "MM.dd") + `(${format(date, "E", { locale: ko })})`;
};

export { getFormatDate_1 };
