import { useQuery } from "@tanstack/react-query";
import { queryKey } from "@/_utils/reactQuery/queryKey.keys";
import { ChatRoomInfo } from "../types/chat.types";
import { fetchChatRoomList } from "../service/chatService";

const useChatList = () => {
  const {
    data: chatRoomList = [] as ChatRoomInfo[],
    error: chatRoomListError
  } = useQuery<ChatRoomInfo[]>({
    queryKey: queryKey.chat.chatRoomList,
    queryFn: () => fetchChatRoomList()
  });
  if (chatRoomListError) throw new Error(chatRoomListError.message);

  return { chatRoomList };
};

export default useChatList;
