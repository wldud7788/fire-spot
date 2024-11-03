import { isSameDay } from "date-fns";
import { MeetInsert, MeetUpdate } from "../types/meet.types";

import { patchMeet, postMeet } from "../actions/meetWriteAction";

const processSubmitData = (formData: MeetInsert, meetId?: string) => {
  let { is_day_trip } = formData;
  const { start_date, end_date } = formData;

  is_day_trip = isSameDay(start_date, end_date);

  const meet = {
    ...formData,
    is_day_trip
  };

  if (meetId) {
    const meetUpdate: MeetUpdate = {
      ...meet
    };
    patchMeet(meetId, meetUpdate);
  } else {
    postMeet(meet);
  }
};

export { processSubmitData };
