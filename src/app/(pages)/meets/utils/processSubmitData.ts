import { isSameDay } from "date-fns";
import { MeetForm } from "../types/meet.types";

const processSubmitData = (formData: MeetForm) => {
  let { supplies, start_date, end_date, is_day_trip } = formData;
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

  supplies = [];
  is_day_trip = isSameDay(start_date, end_date);

  console.log("is_day_trip", is_day_trip);
};

export { processSubmitData };
