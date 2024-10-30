"use server";

import { createClient } from "@/_utils/supabase/server";
import { MeetWithCamp } from "../types/meet.types";

const getMeetList = async (): Promise<MeetWithCamp[]> => {
  const supabase = await createClient();
  const { data, error } = await supabase.from("meet").select(`*, camp(*)`);
  if (error) {
    console.error("getMeetList Error", error);
    throw new Error();
  }

  return { ...data };
};

export { getMeetList };
