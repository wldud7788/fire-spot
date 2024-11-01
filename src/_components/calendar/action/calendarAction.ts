"use server";

import { createClient } from "@/_utils/supabase/server";
import { Schedule, SCHEDULE_TYPE } from "../type/schedule.types";

export const getScheduleList = async (): Promise<Schedule[]> => {
  const supabase = createClient();

  try {
    const userData = await supabase.auth.getUser();
    const userId = !!userData.data.user?.id ? userData.data.user?.id : "";

    const { data: feedData } = await supabase
      .from("feed")
      .select(`*, camp(*)`)
      .eq("user_id", userId);

    const { data: meetData } = await supabase
      .from("meet")
      .select(`*, camp(*)`)
      .eq("user_id", userId);

    if (!feedData || !meetData) {
      throw new Error("No data");
    }
    const schedules: Schedule[] = [
      ...feedData.map((feed) => ({
        type: SCHEDULE_TYPE.stamp,
        typeId: feed.camp?.contentId ?? "",
        content: feed.camp?.facltNm ?? "",
        startDate: feed.time ?? "",
        endDate: feed.time ?? ""
      })),
      ...meetData.map((meet) => ({
        type: SCHEDULE_TYPE.meet,
        typeId: meet.id ?? "",
        content: meet.title ?? "",
        startDate: meet.start_date ?? "",
        endDate: meet.end_date ?? ""
      }))
    ];

    return schedules;
  } catch (e) {
    console.error("schedule patch error,", e);
    return [];
  }
};
