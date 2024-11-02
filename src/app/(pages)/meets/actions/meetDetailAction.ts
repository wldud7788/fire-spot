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

  const { data, error } = await supabase.rpc(supabaseRpc.meet.getMeetDetail, {
    meet_id: Number(meetId)
  });

  if (error || !data) {
    throw new Error("getMeetDetail Error");
  }

  const typedData = data as unknown as MeetWithCamp;

  // typedData.meet.attendee_count = typedData.attendee_count;

  return { ...typedData };
};

const getAttendeeList = async (meetId: string | number) => {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("meet_attendee")
    .select()
    .eq("meet_id", meetId);

  if (error || !data) {
    throw new Error("getAttendeeList Error", error);
  }

  return data;
};

export { getMeetDetail, getAttendeeList };
