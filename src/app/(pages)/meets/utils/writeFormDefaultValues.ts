import { MeetWithCamp } from "../types/meet.types";

export const defaultValues: MeetWithCamp = {
  meet: {
    id: 0,
    user_id: "",
    contentId: 0,
    title: "",
    content: "",
    supplies: [],
    start_date: new Date(),
    end_date: new Date(),
    is_end: false,
    is_day_trip: false,
    is_newbie: true,
    created_at: new Date().toISOString(),
    deadline_headcount: 3,
    deadline_date: null,
    attendee_count: 0
  },
  camp: {
    contentId: 0,
    mapX: 0,
    mapY: 0,
    addr1: "",
    doNm: "",
    sigunguNm: "",
    induty: "",
    facltNm: "",
    lineIntro: "",
    firstImageUrl: "",
    imgUrls: [],
    created_at: new Date().toISOString()
  },
  attendee_count: 0
};