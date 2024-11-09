import { createClient } from "@/_utils/supabase/client";
import supabaseRpc from "@/_utils/supabase/supabase.rpc";
import { Order, ORDER_STRING } from "@/types/order.types";
import {
  ChatMessageInsert,
  ChatRoomInfo,
  ChatRoomInsert,
  ChatRoomTitle,
  ChatRoomType
} from "../types/chat.types";

const supabase = createClient();
export const fetchChatRoomList = async (order: Order = ORDER_STRING.desc) => {
  try {
    const userData = await supabase.auth.getUser();
    const userId = !!userData.data.user?.id ? userData.data.user?.id : "";

    const { data, error } = await supabase.rpc(
      supabaseRpc.chat.getChatRoomList,
      {
        user_id: userId
      }
    );

    if (error) throw new Error(error.message);

    return data ?? ([] as ChatRoomInfo[]);
  } catch (e) {
    console.error("fetchChatRoomList error", e);
    return [] as ChatRoomInfo[];
  }
};

export const fetchChatRoomTitleData = async (roomId: number) => {
  try {
    const { data, error } = await supabase.rpc(
      supabaseRpc.chat.getChatRoomTitle,
      {
        room_id: roomId
      }
    );

    if (error) throw new Error(error.message);

    return data[0];
  } catch (e) {
    console.error("fetchChatRoomList error", e);
  }
};

/**
 *
 * headcount: chat_attendee by roomId
 * message : chat_message room_id = CR.id
 *
 *
 * message 위치는 유저와 비교
 */
export const fetchChatMessageList = async (roomId: number) => {
  try {
    const { data, error } = await supabase.rpc(
      supabaseRpc.chat.getChatMessage,
      {
        room_id: roomId
      }
    );
    if (error) throw new Error(error.message);
    return data;
  } catch (e) {
    console.error("Error fetchChatMessageList ", e);
  }
};

export const postChatMessage = async (messagePost: ChatMessageInsert) => {
  try {
    const { data, error } = await supabase
      .from("chat_message")
      .insert({ ...messagePost });
    if (error) throw new Error(error.message);
    return data;
  } catch (e) {
    console.error("Error fetchChatMessageList ", e);
  }
};

/** 채팅 방 생성 (모임 or sos 작성, 참가 시 호출 ) */
export const postChatRoom = async (type: ChatRoomType, typeId: number) => {
  const meetId = type === "meet" ? typeId : null;
  const sosId = type === "sos" ? typeId : null;

  const chatRoomInsert = {
    type,
    meet_id: meetId,
    sos_id: sosId
  } as ChatRoomInsert;
  try {
    const { data, error } = await supabase
      .from("chat_room")
      .insert({ ...chatRoomInsert });
    if (error) throw new Error(error.message);
    return data;
  } catch (e) {
    console.error("Error fetchChatMessageList ", e);
  }
};
