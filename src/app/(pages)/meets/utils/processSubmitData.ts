import { isSameDay } from "date-fns";
import { MeetForm } from "../types/meet.types";

import { postMeet } from "../actions/meetWriteAction";

// contentId: string;
// title: string;
// content: string;
// supplies: string[];
// start_date: string | Date;
// end_date: string | Date;
// is_day_trip: boolean;
// is_newbie: boolean;
// deadline_headcount: number;
// deadline_date: string | null;
const processSubmitData = (formData: MeetForm) => {
  let { supplies, is_day_trip } = formData;
  const { start_date, end_date } = formData;

  supplies = [];
  is_day_trip = isSameDay(start_date, end_date);

  const meet = {
    ...formData,
    is_day_trip,
    supplies
  };

  postMeet(meet);
};

export { processSubmitData };
