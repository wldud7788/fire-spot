"use server";

import { createClient } from "@/_utils/supabase/server";
import { Meet } from "../types/meet.types";

const getMeetDetail = async ({ meetId }: { meetId: string }) => {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("meet")
    .select(
      `
    *,
    camp (*),
    meet_attendee!inner(id),
    meet_attendee_count:meet_attendee!inner(count)

  `
    )
    .eq("id", meetId)
    .single(); //

  // .returns<Meet[]>();
  // .single();

  if (error) {
    throw new Error("getMeetDetail Error");
  }

  console.log("data", data);

  return data[0];
};

export { getMeetDetail };
