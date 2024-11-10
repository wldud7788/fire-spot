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

/** 채팅 방 생성 (모임 or sos 작성 시 호출 ) */
export const postChatRoom = async (type: ChatRoomType, typeId: number) => {
  const meetId = type === "meet" ? typeId : null;
  const sosId = type === "sos" ? typeId : null;

  const chatRoom = await fetchChatRoomByMeetId(type, typeId);

  // 이미 chatRoom이 생성되어 있다면 반환
  if (chatRoom) {
    return chatRoom;
  }

  const chatRoomInsert = {
    type,
    meet_id: meetId,
    sos_id: sosId
  } as ChatRoomInsert;
  try {
    const { data, error } = await supabase
      .from("chat_room")
      .insert({ ...chatRoomInsert })
      .select()
      .single();

    if (error) throw new Error(error.message);
    return data;
  } catch (e) {
    console.error("Error fetchChatMessageList ", e);
  }
};

// TODO 이거 함수까지 작성함 (postMeetAttendee 함수에서 postChatRoom, postChatAttendee 두 개 연결해야함)
/**
 * 11-09 기준
 * 채팅 message insert만 됨
 *
 * 이제 실제 chat_room 생성해야하고
 * 채팅방 생성될 때 chat_attendee 에 작성자 추가해야하고
 * 모임 참여할 때 chat_attendee에 참여자 추가해야하고
 * 뭐 할 때마다 chat_attendee 수정해야하고 (last 어쩌구)
 * 채팅 메시지 insert될 때 on event 주어야하고,
 *
 * 그리고 채팅 목록 queryKey 고민해야함
 */
/** 모임 참가자 생성 (모임 or sos 작성, 참가 시 호출 ) */
export const postChatAttendee = async (userId: string, roomId: number) => {
  try {
    const { data, error } = await supabase
      .from("chat_attendee")
      .insert({ user_id: userId, room_id: roomId });
    if (error) throw new Error(error.message);
    return data;
  } catch (e) {
    console.error("Error fetchChatMessageList ", e);
  }
};

/**
 * 모임(또는 sos) 작성인 경우 meetId가 없음 즉, 신규 chatRoom을 생성
 * 참여의 경우 기존에 이미 chatRoom이 있음*/
export const fetchChatRoomByMeetId = async (type: string, typeId: number) => {
  try {
    const { data, error } = await supabase
      .from("chat_room")
      .select("*")
      .eq("type", type)
      .eq(`${"meet"}_id`, typeId)
      .single();

    if (error) {
      return null;
    }

    return data;
  } catch (e) {
    console.error("Error fetchChatRoomByMeetId ", e);
  }
};

export const patchChatAttendee = async (
  id: number,
  lastReadMessageId?: number,
  isPin?: boolean
) => {};
