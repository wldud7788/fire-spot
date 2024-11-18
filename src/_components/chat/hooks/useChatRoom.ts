import { useQuery } from "@tanstack/react-query";
import { queryKey } from "@/_utils/reactQuery/queryKey.keys";
import { ChatRoomMessageInfo, ChatRoomTitle } from "../types/chat.types";
import {
  fetchChatMessageList,
  fetchChatRoomTitleData
} from "../service/chatService";
import { convertMessageListToMessagesByDate } from "../utils/chatUtils";

/** 채팅방 상단 정보 */
export const useChatRoomTitle = (roomId: number) => {
  const { data: chatRoomTitle, error } = useQuery<ChatRoomTitle | undefined>({
    queryKey: queryKey.chat.chatRoomTitle(roomId),
    queryFn: () => fetchChatRoomTitleData(roomId)
  });
  if (error) throw new Error(error.message);

  return { chatRoomTitle };
};

/** 채팅방 메시지 목록 */
export const useChatRoomMessage = (roomId: number) => {
  const { data, error } = useQuery<ChatRoomMessageInfo[] | undefined>({
    queryKey: queryKey.chat.chatRoomMessage(roomId),
    queryFn: () => fetchChatMessageList(roomId)
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
