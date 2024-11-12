"use server";

import { createClient } from "@/_utils/supabase/server";
import { SosInsert, SosUpdate } from "../types/sos.types";
import { revalidatePath } from "next/cache";
import {
  postChatAttendee,
  postChatRoom
} from "@/_components/chat/service/chatService";

export const postSos = async (sos: SosInsert) => {
  const supabase = await createClient();

  try {
    const userData = await supabase.auth.getUser();

    const userId = !!userData.data.user?.id ? userData.data.user?.id : "";

    const { data: sosResult, error: sosError } = await supabase
      .from("sos")
      .insert({ ...sos, user_id: userId })
      .select()
      .single();
    if (sosError) {
      throw new Error("postSos Error, " + sosError.message);
    }

    const typeId = sosResult.id;
    const chatRoom = await postChatRoom("sos", typeId);
    if (!chatRoom) {
      throw new Error("Error No chatRoom data");
    }
    await postChatAttendee(userId, chatRoom.id);
    revalidatePath("/sos");
    return true;
  } catch (e) {
    console.error("postSos Error", e);
  }
};

export const patchSos = async (sosId: number, sos: SosUpdate) => {
  const supabase = await createClient();

  try {
    const { data: sosResult, error: sosError } = await supabase
      .from("sos")
      .update({ ...sos })
      .eq("id", sosId);
    // .select()
    // .single();
    if (sosError) {
      throw new Error("patchSos Error ," + sosError.message);
    }
    revalidatePath("/sos");
    return true;

    // postMeetAttendee(meetResult.id);
  } catch (e) {
    console.error("patchSos Error", e);
  }
};
