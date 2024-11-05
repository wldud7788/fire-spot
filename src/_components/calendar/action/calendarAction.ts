"use server";

import { createClient } from "@/_utils/supabase/server";
import { Schedule, SCHEDULE_TYPE } from "../type/schedule.types";
import { fetchMeetAttendeeByUserId } from "@/app/(pages)/meets/actions/meetAttendAction";

export const getScheduleList = async (): Promise<Schedule[]> => {
  const supabase = createClient();

  try {
    const userData = await supabase.auth.getUser();
    const userId = !!userData.data.user?.id ? userData.data.user?.id : "";

    const { data: feedData } = await supabase
      .from("feed")
      .select(`*, camp(*)`)
      .eq("user_id", userId);

    const meetData = (await fetchMeetAttendeeByUserId()).map(
      (item) => item.meet
    );
    // const { data: meetData } = await supabase
    //   .from("meet")
    //   .select(`*, camp(*)`)
    //   .eq("user_id", userId);

    if (!feedData || !meetData) {
      return [];
    }
    const schedules: Schedule[] = [
      ...feedData.map((feed) => ({
        type: SCHEDULE_TYPE.stamp,
        typeId: feed.id ?? "",
        contentId: feed.camp_id ?? "",
        content: feed.camp?.facltNm ?? "",
        startDate: feed.time ?? "",
        endDate: feed.time ?? ""
      })),
      ...meetData.map((meet) => ({
        type: SCHEDULE_TYPE.meet ?? "",
        typeId: meet?.id ?? "",
        contentId: meet?.contentId ?? 0,
        content: meet?.title ?? "",
        startDate: meet?.start_date ?? "",
        endDate: meet?.end_date ?? ""
      }))
    ];

    console.log("schedules", schedules);

    return schedules;
  } catch (e) {
    console.error("schedule patch error,", e);
    return [];
  }
};
