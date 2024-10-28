"use server";

import { createClient } from "@/_utils/supabase/server";
import { MeetWithCamp } from "../types/meet.types";
import supabaseRpc from "../utils/supabase.rpc";

const getMeetDetail = async ({
  meetId
}: {
  meetId: string;
}): Promise<MeetWithCamp> => {
  const supabase = await createClient();

  const { data, error } = await supabase.rpc(supabaseRpc.meet.getMeetDetail, {
    meet_id: meetId
  });
  if (error) {
    throw new Error("getMeetDetail Error");
  }

  data.meet.attendee_count = data.attendee_count;

  return { ...data };
};

export { getMeetDetail };
