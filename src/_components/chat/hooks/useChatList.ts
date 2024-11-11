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

  /** 핀 고정 된 메시지, 고정 안 된 메시지 따로 push */
  const pinnedChatRoomList = [] as ChatRoomInfo[];
  const unPinnedChatRoomList = [] as ChatRoomInfo[];

  chatRoomList.forEach((chatRoom) => {
    if (chatRoom.chatAttendee.is_pin) {
      pinnedChatRoomList.push(chatRoom);
    } else {
      unPinnedChatRoomList.push(chatRoom);
    }
  });

  return {
    pinnedChatRoomList,
    unPinnedChatRoomList
  };
};

export default useChatList;
