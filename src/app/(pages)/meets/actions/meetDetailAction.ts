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
    camp (*)`
    )
    .eq("id", meetId)
    .returns<Meet[]>();
  // .single();

  if (error) {
    throw new Error("getMeetDetail Error");
  }

  return data[0];
};

export { getMeetDetail };
