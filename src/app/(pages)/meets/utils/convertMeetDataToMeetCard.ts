import { formatDate_1 } from "@/_utils/common/dateFormat";
import { CampSelect } from "../types/camp.types";
import { MeetCard, MeetSelect, MeetWithCamp } from "../types/meet.types";
import { isBefore, startOfDay, subDays } from "date-fns";
import { DEADLINE_APPROACHING } from "@/_utils/common/constant";

const convertMeetDataToMeetCard = (
  meetWithCampList: MeetWithCamp[],
  isProgress?: boolean
) => {
  const meetCardList: MeetCard[] = meetWithCampList.map((meetWithCamp) => {
    const { meet, camp, attendee_count } = meetWithCamp;

    const { id, title, start_date, deadline_headcount } = meet;
    const { sigunguNm: location } = camp;

    const tags = getTags({ camp, meet });
    const date = formatDate_1(start_date);

    // 마감: 모임 시작일이 오늘 보다 이전일 경우 || 모집 인원이 다 찬 경우
    const isDeadline =
      isBefore(meetWithCamp.meet.start_date, new Date()) ||
      meet.deadline_headcount <= attendee_count;

    // 마감 임박: 모임 시작일이  DEADLINE_APPROACHING 만큼 남은 경우 && 마감이 아닌 경우
    const isDeadlineApproaching =
      subDays(startOfDay(meetWithCamp.meet.start_date), DEADLINE_APPROACHING) <=
        new Date() && !isDeadline;

    return {
      id,
      title,
      date,
      deadline_headcount,
      tags,
      location,
      attendee_count,
      isDeadlineApproaching,
      isDeadline
    };
  });

  const filterMeetCardList = meetCardList.filter((meetCard) => {
    if (isProgress) {
      return !meetCard.isDeadline;
    }

    return meetCard.isDeadline;

    // console.log("meetCard", meetCard);
    // console.log("meetCard.isDeadline", meetCard.isDeadline);
    // console.log("isProgress", isProgress);
    // console.log("================================");
    // return !meetCard.isDeadline && isProgress;
  });

  return filterMeetCardList;
};

const getTags = ({ camp, meet }: { camp: CampSelect; meet: MeetSelect }) => {
  const tags: string[] = [];

  if (camp.induty) {
    camp.induty.split(",").forEach((tag) => tags.push(tag.trim()));
  } else {
    tags.push("캠핑장");
  }

  const isNewbie = meet.is_newbie ? "초보 가능" : "숙련자";

  // const isDeadlineApproaching =
  //   subDays(startOfDay(meet.start_date), DEADLINE_APPROACHING) <= new Date();

  // const isDeadline =
  //   isBefore(meet.start_date, new Date()) ||
  //   meet.deadline_headcount <= attendee_count;

  // if (isDeadlineApproaching) {
  //   tags.push("마감임박");
  // }

  // if (isDeadline) {
  //   tags.push("마감");
  // }

  tags.push(isNewbie);

  return tags;
};

export { convertMeetDataToMeetCard };
