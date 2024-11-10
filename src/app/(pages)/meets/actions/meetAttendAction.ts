"use server";

import {
  postChatAttendee,
  postChatRoom
} from "@/_components/chat/service/chatService";
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

// TODO (postMeetAttendee 함수에서 postChatRoom, postChatAttendee 두 개 연결해야함)
const postMeetAttendee = async (meetId: number) => {
  const supabase = await createClient();

  try {
    const userData = await supabase.auth.getUser();
    const userId = userData.data.user?.id || "";

    const { data: meetAttendee, error: meetAttendeeError } = await supabase
      .from("meet_attendee")
      .insert({ meet_id: meetId, user_id: userId })
      .select()
      .single();

    if (meetAttendeeError || !meetAttendee) {
      console.error(meetAttendeeError);
      throw new Error("postMeetAttendee Error,");
    }

    const typeId = meetAttendee.meet_id;

    const chatRoom = await postChatRoom("meet", typeId);

    if (!chatRoom) {
      throw new Error("Error No chatRoom data");
    }

    await postChatAttendee(userId, chatRoom.id);

    return meetAttendee;
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
