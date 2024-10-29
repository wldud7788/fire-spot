import { createClient } from "@/_utils/supabase/client";

const supabase = createClient();

export const getChatData = async (room_id: number) => {
  const { data, error } = await supabase
    .from("chat")
    .select("*")
    .eq("room_id", room_id);
  if (error) {
    console.error("Error loading fetchChatData:", error.message);
  }

  return data;
};
