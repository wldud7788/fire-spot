import { createClient } from "@/_utils/supabase/client";
import supabaseRpc from "@/_utils/supabase/supabase.rpc";
import { Order, ORDER_STRING } from "@/types/order.types";

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

    if (!data) {
      return [];
    }
    return data;
  } catch (e) {
    console.error("fetchChatRoomList error", e);
  }
};
