import { useQuery } from "@tanstack/react-query";
import { queryKey } from "@/_utils/reactQuery/queryKey.keys";
import { ChatRoomMessageInfo } from "../types/chat.types";
import {
  fetchChatMessageList,
  fetchSosChatMessageList
} from "../service/chatService";
import { convertMessageListToMessagesByDate } from "../utils/chatUtils";

/** SOS 채팅방 메시지 목록 */
export const useChatSosMessage = (roomId: number) => {
  const { data, error } = useQuery<ChatRoomMessageInfo[] | undefined>({
    queryKey: queryKey.chat.chatRoomMessage(roomId),
    queryFn: () => fetchSosChatMessageList(roomId)
  });

  const messagesByDate = convertMessageListToMessagesByDate(data);

  if (error) throw new Error(error.message);

  return { messagesByDate };
};
