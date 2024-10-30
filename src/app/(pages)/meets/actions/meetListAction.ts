"use server";

import { createClient } from "@/_utils/supabase/server";
import { MeetCard, MeetWithCamp } from "../types/meet.types";
import supabaseRpc from "@/_utils/supabase/supabase.rpc";

const getMeetList = async (): Promise<MeetWithCamp[]> => {
  const supabase = await createClient();

  const { data, error } = await supabase.rpc(supabaseRpc.meet.getMeetList);

  console.log("data", data);

  if (error) {
    console.error("getMeetList Error", error);
    throw new Error();
  }

  return data;
};

export { getMeetList };
