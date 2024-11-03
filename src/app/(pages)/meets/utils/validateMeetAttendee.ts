import { format, startOfDay } from "date-fns";
import { fetchMeetAttendeeByUserId } from "../actions/meetAttendAction";
import { ko } from "date-fns/locale";
/**
 *  내가 같은 기간에 이미 다른 모임에 참여중이라면 true 반환
 * 참여하기, 작성 시 체크하는 함수
 */
const checkHasSchedule = async (startDate: Date, endDate: Date) => {
  const meetList = (await fetchMeetAttendeeByUserId()).map((item) => item.meet);

  if (!meetList) return false;

  const startCheck = format(startOfDay(startDate), "yyyy-MM-dd", {
    locale: ko
  });
  const endCheck = format(startOfDay(endDate), "yyyy-MM-dd", { locale: ko });

  const hasSchedule = meetList.some((meet) => {
    if (!meet) return false;

    const meetStart = format(startOfDay(meet.start_date), "yyyy-MM-dd", {
      locale: ko
    });
    const meetEnd = format(startOfDay(meet.end_date), "yyyy-MM-dd", {
      locale: ko
    });

    return startCheck <= meetEnd && endCheck >= meetStart;
  });

  return hasSchedule;
};

export { checkHasSchedule };
