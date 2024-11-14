import { MIN_HEADCOUNT } from "@/_utils/common/constant";
import { MeetWithCamp } from "../types/meet.types";
import { addDays } from "date-fns";

export const defaultValues: MeetWithCamp = {
  meet: {
    id: 0,
    user_id: "",
    contentId: 0,
    title: "",
    content: "",
    supplies: [],
    start_date: addDays(new Date(), 1),
    end_date: addDays(new Date(), 1),
    is_end: false,
    is_day_trip: false,
    is_newbie: true,
    ground_type: "any",
    created_at: new Date().toISOString(),
    deadline_headcount: MIN_HEADCOUNT,
    deadline_date: null
  },
  camp: {
    contentId: 0,
    mapX: 0,
    mapY: 0,
    addr1: "",
    doNm: "",
    sigunguNm: "",
    intro: "",
    induty: "",
    facltNm: "",
    lineIntro: "",
    firstImageUrl: "",
    imgUrls: [],
    created_at: new Date().toISOString()
  },
  attendee_count: 0,
  chat_room_id: 0
};
