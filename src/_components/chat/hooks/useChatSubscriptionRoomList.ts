import { queryKey } from "@/_utils/reactQuery/queryKey.keys";
import { createClient } from "@/_utils/supabase/client";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";

export const useChatSubscriptionRoomList = () => {
  const supabase = createClient();
  const queryClient = useQueryClient();
  useEffect(() => {
    const channel = supabase
      .channel("schema-db-changes")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "chat_message"
          // filter:
        },
        () => {
          queryClient.invalidateQueries({
            queryKey: queryKey.chat.chatRoomList
          });
        }
      )
      .subscribe();

    return () => {
      channel.unsubscribe();
    };
  }, []);
};
