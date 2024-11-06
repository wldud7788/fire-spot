import { formatDate_1 } from "@/_utils/common/dateFormat";
import { CampSelect } from "../types/camp.types";
import { MeetCard, MeetSelect, MeetWithCamp } from "../types/meet.types";
import { isAfter, isBefore, startOfDay, subDays } from "date-fns";
import { DEADLINE_APPROACHING } from "@/_utils/common/constant";

const convertMeetDataToMeetCard = (
  meetWithCampList: MeetWithCamp[],
  isProgress?: boolean
) => {
  const meetCardList: MeetCard[] = meetWithCampList.map((meetWithCamp) => {
    const { meet, camp, attendee_count } = meetWithCamp;

    const { id, title, start_date, deadline_headcount } = meet;
    const { sigunguNm: location } = camp;

    const tags = getTags({ camp, meet, attendee_count });
    const date = formatDate_1(start_date);

    const isDeadlineApproaching =
      subDays(startOfDay(meetWithCamp.meet.start_date), DEADLINE_APPROACHING) <=
      new Date();

    const isDeadline = isBefore(meetWithCamp.meet.start_date, new Date());

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
    return !(meetCard.isDeadline && isProgress);
  });

  return filterMeetCardList;
};

const getTags = ({
  camp,
  meet,
  attendee_count
}: {
  camp: CampSelect;
  meet: MeetSelect;
  attendee_count: number;
}) => {
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
