import { createClient } from "@/_utils/supabase/client";
import supabaseRpc from "@/_utils/supabase/supabase.rpc";
import { Order, ORDER_STRING } from "@/types/order.types";
import {
  ChatAttendeeUpdate,
  ChatMessageInsert,
  ChatRoomInfo,
  ChatRoomInsert,
  ChatRoomMessageInfo,
  ChatRoomType
} from "../types/chat.types";

const supabase = createClient();

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
    const userData = await supabase.auth.getUser();
    const userId = !!userData.data.user?.id ? userData.data.user?.id : "";
    const { data, error } = await supabase.rpc(
      supabaseRpc.chat.getChatMessage,
      {
        room_id: roomId,
        user_id: userId
      }
    );
    if (error) throw new Error(error.message);

    if (!data) return [] as ChatRoomMessageInfo[];
    return data;
  } catch (e) {
    console.error("Error fetchChatMessageList ", e);
  }
};

/** SOS 전용 채팅 메시지 목록 */
export const fetchSosChatMessageList = async (roomId: number) => {
  try {
    const { data, error } = await supabase.rpc(
      supabaseRpc.chat.getChatMessage,
      {
        room_id: roomId
      }
    );
    if (error) throw new Error(error.message);

    if (!data) return [] as ChatRoomMessageInfo[];
    return data;
  } catch (e) {
    console.error("Error fetchChatMessageList ", e);
  }
};

/** 마지막 메시지 (last_read_message_id를 위함)*/
export const fetchLastChatMessage = async (roomId: number) => {
  try {
    const { data, error } = await supabase
      .from("chat_message")
      .select("*")
      .eq("room_id", roomId)
      .order("created_at", { ascending: false })
      .limit(1);
    if (error) throw new Error(error.message);

    if (data.length < 1) return null;

    return data[0];
  } catch (e) {
    console.error("Error fetchLastChatMessage ", e);
    return null;
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

/** 모든 채팅방 기준 마지막 메시지 */
const lastChatMessageByAllRooms = async () => {
  try {
    const { data, error } = await supabase
      .from("chat_message")
      .select("id")
      .order("created_at", { ascending: false })
      .limit(1);

    return data;
  } catch (e) {
    console.error("fetchLastChatMessageByAllRooms" + e);
  }
};

/** 채팅방의 모든 참여자 */
export const fetchChatAttendeeByRoomId = async (roomId: number) => {
  try {
    const { data, error } = await supabase
      .from("chat_attendee")
      .select("user_id")
      .eq("room_id", roomId);

    return data;
  } catch (e) {
    console.error("Error fetchChatAttendee" + e);
  }
};

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
 * TODO 이제 채팅방 들어가면 last_read_어쩌구 업데이트 해줘야됨(null로) (나갈때는 마지막 id)
 * 이거 되면 안읽은 메시지 표시하는것도 끝
 *
 * */

export const patchChatAttendee = async (
  userId: string,
  roomId: number,
  chatAttendee: ChatAttendeeUpdate
) => {
  try {
    const { data, error } = await supabase
      .from("chat_attendee")
      .update(chatAttendee)
      .eq("user_id", userId)
      .eq("room_id", roomId)
      .single();

    if (error) {
      return null;
    }

    return data;
  } catch (e) {
    console.error("Error patchChatAttendee ", e);
  }
};

export const fetchChatRoomBySosId = async (sosId: number) => {
  try {
    const { data, error } = await supabase
      .from("chat_room")
      .select("*")
      .eq("sos_id", sosId)
      .single();

    if (error) {
      throw new Error("Error fetchChatRoomBySosId, " + error.message);
    }

    if (!data) {
      return null;
    }

    return data;
  } catch (e) {}
};
