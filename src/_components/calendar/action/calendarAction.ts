"use server";

import { dummySchedules } from "../mock";
import { Schedule } from "../type/schedules";

export const getScheduleList = async (): Promise<Schedule[]> => {
  const schedules = await new Promise<Schedule[]>((resolve) => {
    setTimeout(() => {
      resolve(dummySchedules);
    }, 100);
  });

  return schedules;
};
