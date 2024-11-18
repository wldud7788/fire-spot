"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchReviewData } from "../../reviews/action/feedAction";
import { fetchMeetAttendeeByUserId } from "../../meets/actions/meetAttendAction";

export const useCalendarFooter = () => {
  const { data: reviewCount } = useQuery({
    queryFn: () => fetchReviewData(),
    queryKey: ["reviewCount", "testUser"]
  });

  const { data: meetAttendeeData } = useQuery({
    queryFn: () => fetchMeetAttendeeByUserId(),
    queryKey: ["meetAttendee", "testUser"]
  });

  const meetAttendeeCount = meetAttendeeData?.length || 0;

  return { reviewCount, meetAttendeeCount };
};
