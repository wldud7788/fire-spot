import { getFormatDate_1 } from "@/_utils/common/dateFormat";
import { CampFromDB } from "../types/camp.types";
import { MeetCard, MeetResponse, MeetWithCamp } from "../types/meet.types";

const convertMeetDataToMeetCard = (meetWithCampList: MeetWithCamp[]) => {
  const meetCardList: MeetCard[] = meetWithCampList.map((meetWithCamp) => {
    const { meet, camp, attendee_count } = meetWithCamp;

    const { id, title, start_date, deadline_headcount } = meet;
    const { sigunguNm: location } = camp;

    const tags: string[] = getTags({ meet, camp });
    const date = getFormatDate_1(start_date);

    return {
      id,
      title,
      date,
      deadline_headcount,
      tags,
      location,
      attendee_count
    };
  });

  return meetCardList;
};

const getTags = ({ camp, meet }: { camp: CampFromDB; meet: MeetResponse }) => {
  const tags = [];
  camp.induty.split(",").forEach((tag) => tags.push(tag));

  const isNewbie = meet.is_newbie ? "초보 가능" : "초보 불가능";
  tags.push(isNewbie);

  return tags;
};

export { convertMeetDataToMeetCard };
