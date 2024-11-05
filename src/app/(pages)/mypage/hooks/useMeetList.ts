"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchMeetAttendeeWithMeetAndCampByUserId } from "../../meets/actions/meetAttendAction";

export const useMeetList = () => {
  const { data: meetAttendeeData } = useQuery({
    queryFn: () => fetchMeetAttendeeWithMeetAndCampByUserId(),
    queryKey: ["meetAttendee", "testUser"]
  });

  console.log("meetAttendeeData", meetAttendeeData);

  const meets = meetAttendeeData?.map(
    (meetAttendee) =>
      // const meetWithCamp:MeetWithCamp
      meetAttendee.meet
  );

  return { meets };
};
