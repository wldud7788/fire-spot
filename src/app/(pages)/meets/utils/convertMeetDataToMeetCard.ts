import { formatDate_1 } from "@/_utils/common/dateFormat";
import { CampSelect } from "../types/camp.types";
import { MeetCard, MeetSelect, MeetWithCamp } from "../types/meet.types";

const convertMeetDataToMeetCard = (meetWithCampList: MeetWithCamp[]) => {
  const meetCardList: MeetCard[] = meetWithCampList.map((meetWithCamp) => {
    const { meet, camp, attendee_count } = meetWithCamp;

    const { id, title, start_date, deadline_headcount } = meet;
    const { sigunguNm: location } = camp;

    const tags = getTags({ camp, meet });
    const date = formatDate_1(start_date);

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

const getTags = ({ camp, meet }: { camp: CampSelect; meet: MeetSelect }) => {
  const tags: string[] = [];

  if (camp.induty) {
    camp.induty.split(",").forEach((tag) => tags.push(tag.trim()));
  } else {
    tags.push("캠핑장");
  }

  const isNewbie = meet.is_newbie ? "초보 가능" : "초보 불가능";
  tags.push(isNewbie);

  return tags;
};

export { convertMeetDataToMeetCard };
