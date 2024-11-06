"use client";

import { useSuspenseQuery } from "@tanstack/react-query";
import { fetchMeetAttendeeWithMeetAndCampByUserId } from "../../meets/actions/meetAttendAction";
import { useState } from "react";

export const useMeetList = () => {
  const [isProgress, setIsProgress] = useState(true);

  const { data: meetWithCampList } = useSuspenseQuery({
    queryFn: () => fetchMeetAttendeeWithMeetAndCampByUserId(),
    queryKey: ["meetAttendee", "testUser"],
    initialData: [],
    staleTime: 0
  });

  const toggleShowType = () => {
    setIsProgress(!isProgress);
  };

  return { meetWithCampList, isProgress, toggleShowType };
};
