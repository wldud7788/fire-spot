"use server";

import { createClient } from "@/_utils/supabase/server";
import { Meet } from "../types/meet.types";
import meetRpc from "../utils/meet.supabase.rpc";

const getMeetDetail = async ({ meetId }: { meetId: string }) => {
  const supabase = await createClient();
  // const { data, error } = await supabase
  //   .from("meet")
  //   .select(
  //     `
  //   *,
  //   camp (*),
  //   meet_attendee_count:meet_attendee!inner(count)

  // `
  //   )
  //   .eq("id", meetId)
  //   .returns<Meet[]>();

  const { data, error } = await supabase.rpc(meetRpc.getMeetDetail);

  if (error) {
    throw new Error("getMeetDetail Error");
  }

  console.log("data", data);

  return data[0];
};

export { getMeetDetail };
