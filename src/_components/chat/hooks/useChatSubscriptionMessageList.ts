import { queryKey } from "@/_utils/reactQuery/queryKey.keys";
import { createClient } from "@/_utils/supabase/client";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { ChatMessageSelect } from "../types/chat.types";

export const useChatSubscriptionMessageList = (roomId: number) => {
  const supabase = createClient();
  const queryClient = useQueryClient();
  const [lastChatMessageId, setLastChatMessageId] = useState<number | null>(
    null
  );
  useEffect(() => {
    console.log("lastChatMessageId", lastChatMessageId);

    const channel = supabase
      .channel("schema-db-changes")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "chat_message"
        },
        (payload) => {
          const chatMessage = payload.new as ChatMessageSelect;

          queryClient.invalidateQueries({
            queryKey: queryKey.chat.chatRoomMessage(roomId)
          });
        }
      )
      .subscribe();

    return () => {
      channel.unsubscribe();
    };
  }, []);
};
