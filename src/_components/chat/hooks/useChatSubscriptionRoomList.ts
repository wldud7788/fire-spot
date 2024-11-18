import { queryKey } from "@/_utils/reactQuery/queryKey.keys";
import { createClient } from "@/_utils/supabase/client";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";

/** 채팅메시지가 전송됨에 따라 채팅 목록의 정보도 업데이트 되어야함 */
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
