import { createClient } from "@/_utils/supabase/client";
import supabaseRpc from "@/_utils/supabase/supabase.rpc";
import { Order, ORDER_STRING } from "@/types/order.types";
import { ChatRoomInfo, ChatRoomTitle } from "../types/chat.types";

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

    if (error) {
      throw new Error(error.message);
    }

    return data ?? ([] as ChatRoomInfo[]);
  } catch (e) {
    console.error("fetchChatRoomList error", e);
    return [] as ChatRoomInfo[];
  }
};

export const fetchChatRoomTitleData = async (roomId: number) => {
  try {
    // const { data, error } = await supabase
    //   .from("chat_room")
    //   .select(
    //     `
    //     *,
    //     meet(*),
    //     headcount:chat_attendee(count)
    //     `
    //   )
    //   .eq("id", roomId)
    //   .single();

    const { data, error } = await supabase.rpc(
      supabaseRpc.chat.getChatRoomTitle,
      {
        room_id: roomId
      }
    );

    if (error) {
      throw new Error(error.message);
    }

    return data[0];
  } catch (e) {
    console.error("fetchChatRoomList error", e);
  }
};

/**
 *
 * title: meet  meet.id = chat_room.meet_id
 * headcount: chat_attendee by roomId
 * message :
 *
 *
 */
export const fetchChatMessageList = async (roomId: number) => {
  // var a = {
  //   headcount,
  // }
};
