"use server";

import { createClient } from "@/_utils/supabase/server";
import { Order, ORDER_STRING } from "@/types/order.types";

export const fetchChatRoomList = async (order: Order = ORDER_STRING.desc) => {
  const supabase = createClient();

  try {
    const userData = await supabase.auth.getUser();
    const userId = !!userData.data.user?.id ? userData.data.user?.id : "";

    const { data, error } = await supabase.rpc("get_chat_room_list", {
      user_id: userId
    });

    if (error) {
      throw new Error(error.message);
    }

    if (!data) {
      return [];
    }
    return data;
  } catch (e) {
    console.error("fetchChatRoomList error", e);
  }
};

/**
 * 채팅방에 들어갔을 때 메시지 목록 호출
 *
 * {
 *   "2024-10-17":[
 *      {
 *
 *       }
 *    ]
 * }
 *
 * [
 *  {
 *    id:
 *  }
 * ]
 */

const a = {
  "2024-10-17": [
    {
      id: 1,
      nickname: "닉네임자리",
      unreadCount: 1, // 안읽은 사람 수
      sendTime: "오전 12:05",
      message: "지금 뭐함"
      // isSentByMe:false, // 내가 보낸 메시지 (오른쪽에 표시)
    },
    {
      id: 2,
      nickname: "내 닉네임",
      unreadCount: 1, // 안읽은 사람 수
      sendTime: "오전 12:05",
      message: "지금 뭐함"
      // isSentByMe:uid, // 내가 보낸 메시지 (오른쪽에 표시) 이거 그냥 로그인 유저 기준 클라이언트에서 비교해서
    }
  ]
};

export const fetchChatMessageByRoomId = (roomId: number) => {};
