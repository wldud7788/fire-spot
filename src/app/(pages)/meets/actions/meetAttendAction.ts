"use server";

import { createClient } from "@/_utils/supabase/server";

const postMeetAttendee = async (meetId: number) => {
  const supabase = await createClient();

  try {
    const userData = await supabase.auth.getUser();
    const userId = userData.data.user?.id;

    const { data, error: meetAttendeeError } = await supabase
      .from("meet_attendee")
      .insert({ meet_id: meetId, user_id: userId })
      .select()
      .single();

    if (meetAttendeeError || !data) {
      console.error(meetAttendeeError);
      throw new Error("postMeetAttendee Error,");
    }
    return data;
  } catch (e) {
    console.error(e);
    throw e;
  }
};

const deleteMeetAttendee = async (attendeeId: number) => {
  const supabase = await createClient();

  try {
    const { error: error } = await supabase
      .from("meet_attendee")
      .delete()
      .eq("id", attendeeId);

    if (error) {
      console.error(error);
      return false;
    }

    return true;
  } catch (e) {
    console.error("postMeetAttendee Error,", e);
  }
};

export { postMeetAttendee, deleteMeetAttendee };
