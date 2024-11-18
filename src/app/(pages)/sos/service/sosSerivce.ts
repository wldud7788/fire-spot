"use server";

import { createClient } from "@/_utils/supabase/server";
import { SosInsert, SosUpdate, SosWithCamp } from "../types/sos.types";
import { revalidatePath } from "next/cache";
import {
  postChatAttendee,
  postChatRoom
} from "@/_components/chat/service/chatService";
import supabaseRpc from "@/_utils/supabase/supabase.rpc";

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

export const getSosList = async (): Promise<SosWithCamp[]> => {
  const supabase = await createClient();

  const { data, error } = await supabase.rpc(supabaseRpc.sos.getSosList);

  if (error) {
    console.error("getMeetList Error", error);
    throw new Error();
  }

  if (!data) return [] as SosWithCamp[];

  return data;
};

export const getSosDetail = async (sosId: number) => {
  const supabase = await createClient();

  const { data, error } = await supabase.rpc(supabaseRpc.sos.getSosDetail, {
    sos_id: Number(sosId)
  });

  if (error || !data) {
    return null;
  }

  return data[0];
};

export const getSosCountByProgress = async () => {
  const supabase = await createClient();
  const threeHoursAgo = new Date();
  threeHoursAgo.setHours(threeHoursAgo.getHours() - 3);

  try {
    const { data: sosCountByProgress, error } = await supabase
      .from("sos")
      .select("*")
      .gte("created_at", threeHoursAgo.toISOString());

    if (error) {
      throw new Error("getSosCountByProgress Error ," + error.message);
    }

    return sosCountByProgress.length;

    // postMeetAttendee(meetResult.id);
  } catch (e) {
    console.error("getSosCountByProgress Error", e);
    return 0;
  }
};
