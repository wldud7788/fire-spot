import { createClient } from "@/_utils/supabase/client";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { queryKey } from "@/_utils/reactQuery/queryKey.keys";
import { ChatRoomMessageInfo, ChatRoomTitle } from "../types/chat.types";
import {
  fetchChatMessageList,
  fetchChatRoomTitleData
} from "../service/chatService";

export const useChatRoomTitle = (roomId: number) => {
  const { data: chatRoomTitle, error } = useQuery<ChatRoomTitle | undefined>({
    queryKey: queryKey.chat.chatRoomTitle(roomId),
    queryFn: () => fetchChatRoomTitleData(roomId)
  });
  if (error) throw new Error(error.message);

  return { chatRoomTitle };
};

export const useChatRoomMessage = (roomId: number) => {
  const supabase = createClient();
  const queryClient = useQueryClient();
  const { data: chatMessage, error } = useQuery<
    ChatRoomMessageInfo[] | undefined
  >({
    queryKey: queryKey.chat.chatRoomMessage(roomId),
    queryFn: () => fetchChatMessageList(roomId)
  });

  console.log(
    "queryKey.chat.chatRoomMessage(roomId),",
    queryKey.chat.chatRoomMessage(roomId)
  );

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
      (payload) => {
        console.log(payload);
        queryClient.invalidateQueries({
          queryKey: queryKey.chat.chatRoomMessage(roomId)
        });
      }
    )
    .subscribe();

  if (error) throw new Error(error.message);

  return { chatMessage };
};
