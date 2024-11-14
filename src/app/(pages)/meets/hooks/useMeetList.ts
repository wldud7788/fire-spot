import { useQuery } from "@tanstack/react-query";
import { MeetWithCamp } from "../types/meet.types";
import { fetchMeetList } from "../actions/meetListAction";
import { useState } from "react";

export const useMeetList = () => {
  const [isProgress, setIsProgress] = useState(true);
  const { data: meetWithCampList, isError } = useQuery<MeetWithCamp[]>({
    queryKey: ["meets"],
    queryFn: async () => fetchMeetList()
  });

  const toggleShowType = (condition: boolean) => {
    setIsProgress(condition);
  };

  return { meetWithCampList, isProgress, toggleShowType };
};
