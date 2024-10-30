import { CampFromDB } from "../types/camp.types";
import { MeetCard, MeetResponse, MeetWithCamp } from "../types/meet.types";
import { format, parse } from "date-fns";
import { ko } from "date-fns/locale";
const convertMeetDataToMeetCard = (meetWithCampList: MeetWithCamp[]) => {
  // console.log("meetWithCampList", meetWithCampList);

  const meetCardList: MeetCard[] = meetWithCampList.map((meetWithCamp) => {
    const { meet, camp, attendee_count } = meetWithCamp;

    const { id, title, start_date, deadline_headcount } = meet;
    const { sigunguNm } = camp;
    const tags: string[] = getTags({ meet, camp });
    const location = sigunguNm;
    const date =
      format(start_date, "MM.dd") +
      `(${format(start_date, "E", { locale: ko })})`;

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
