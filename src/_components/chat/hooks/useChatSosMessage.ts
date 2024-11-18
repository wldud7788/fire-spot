import { useQuery } from "@tanstack/react-query";
import { queryKey } from "@/_utils/reactQuery/queryKey.keys";
import { ChatRoomMessageInfo } from "../types/chat.types";
import { fetchSosChatMessageList } from "../service/chatService";
import { convertMessageListToMessagesByDate } from "../utils/chatUtils";

/** SOS 채팅방 메시지 목록 */
export const useChatSosMessage = (roomId: number) => {
  const { data, error } = useQuery<ChatRoomMessageInfo[] | undefined>({
    queryKey: queryKey.chat.chatRoomMessage(roomId),
    queryFn: () => fetchSosChatMessageList(roomId)
  });

  const messagesByDate = convertMessageListToMessagesByDate(data);

  if (!messagesByDate) {
    return {};
  }

  const dateArr = Object.keys(messagesByDate || {});
  // const lastDate = dateArr[dateArr.length - 1];

  const lastDate = dateArr.slice(-1)[0];

  const lastDateMessages = messagesByDate[lastDate];
  const lastMessage = lastDateMessages.slice(-1)[0];

  if (error) throw new Error(error.message);

  return { messagesByDate, lastMessage };
};
