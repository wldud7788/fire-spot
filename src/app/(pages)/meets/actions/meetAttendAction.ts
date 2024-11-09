"use server";

import { postChatRoom } from "@/_components/chat/service/chatService";
import { createClient } from "@/_utils/supabase/server";

const fetchMeetAttendeeByMeetId = async (meetId: string | number) => {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("meet_attendee")
    .select()
    .eq("meet_id", meetId);

  if (error || !data) {
    throw new Error("fetchMeetAttendeeByMeetId Error", error);
  }

  return data;
};

const fetchMeetAttendeeByUserId = async () => {
  const supabase = await createClient();

  try {
    const userData = await supabase.auth.getUser();
    const userId = userData.data.user?.id ?? "";

    const { data, error } = await supabase
      .from("meet_attendee")
      .select(`*, meet(*)`)
      .eq("user_id", userId);

    if (error) {
      throw new Error("fetchMeetAttendee Error: ", error);
    }
    return data;
  } catch (e) {
    throw new Error(e + "");
  }
};

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

export {
  postMeetAttendee,
  deleteMeetAttendee,
  fetchMeetAttendeeByMeetId,
  fetchMeetAttendeeByUserId
};
