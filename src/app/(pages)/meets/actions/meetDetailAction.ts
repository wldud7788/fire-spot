"use server";

import { createClient } from "@/_utils/supabase/server";
import { MeetWithCamp } from "../types/meet.types";
import supabaseRpc from "@/_utils/supabase/supabase.rpc";

const getMeetDetail = async ({
  meetId
}: {
  meetId: string;
}): Promise<MeetWithCamp> => {
  const supabase = await createClient();
  const { data, error } = await supabase.rpc("get_meet_detail", {
    meet_id: meetId
  });
  if (error) {
    console.error("getMeetDetail Error", error);
    throw new Error();
  }

  data.meet.attendee_count = data.attendee_count;

  return { ...data };
};

export { getMeetDetail };
