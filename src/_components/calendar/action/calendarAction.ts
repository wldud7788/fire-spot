"use server";

import { createClient } from "@/_utils/supabase/server";
import { dummySchedules } from "../mock";
import { Schedule } from "../type/schedule.types";

export const getScheduleList = async (): Promise<Schedule[]> => {
  const supabase = createClient();
  //   const

  //   const { data: feedData } = await supabase
  //   .from('feed')
  //   .select('*')
  //   .eq('user_id', userId);

  // const { data: meetData } = await supabase
  //   .from('meet')
  //   .select('*')
  //   .eq('user_id', userId);

  const schedules = await new Promise<Schedule[]>((resolve) => {
    setTimeout(() => {
      resolve(dummySchedules);
    }, 100);
  });

  return schedules;
};
