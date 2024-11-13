"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchReviewData } from "../../reviews/action/feedAction";
import { fetchMeetAttendeeByUserId } from "../../meets/actions/meetAttendAction";

export const useCalendarFooter = () => {
  const { data: feedData } = useQuery({
    queryFn: () => fetchReviewData(),
    queryKey: ["feeds", "testUser"]
  });

  const { data: meetAttendeeData } = useQuery({
    queryFn: () => fetchMeetAttendeeByUserId(),
    queryKey: ["meetAttendee", "testUser"]
  });

  const feedCount = feedData?.length || 0;
  const meetAttendeeCount = meetAttendeeData?.length || 0;

  return { feedCount, meetAttendeeCount };
};
