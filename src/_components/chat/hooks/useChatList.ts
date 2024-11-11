import { useQuery, useQueryClient } from "@tanstack/react-query";
import { queryKey } from "@/_utils/reactQuery/queryKey.keys";
import { ChatAttendeeUpdate, ChatRoomInfo } from "../types/chat.types";
import { fetchChatRoomList, patchChatAttendee } from "../service/chatService";
import useUser from "@/_hooks/useUser";

const useChatList = () => {
  const queryClient = useQueryClient();
  const user = useUser();

  const {
    data: chatRoomList = [] as ChatRoomInfo[],
    error: chatRoomListError
  } = useQuery<ChatRoomInfo[]>({
    queryKey: queryKey.chat.chatRoomList,
    queryFn: () => fetchChatRoomList()
  });
  if (chatRoomListError) throw new Error(chatRoomListError.message);

  const pinnedChatRoomList = [] as ChatRoomInfo[];
  const unPinnedChatRoomList = [] as ChatRoomInfo[];

  chatRoomList.forEach((chatRoom) => {
    if (chatRoom.chatAttendee.is_pin) {
      pinnedChatRoomList.push(chatRoom);
    } else {
      unPinnedChatRoomList.push(chatRoom);
    }
  });

  const userId = user?.id || "";

  const togglePin = async (roomId: number, isPin: boolean) => {
    const chatAttendee = {
      is_pin: isPin
    };

    await patchChatAttendee(userId, roomId, chatAttendee);

    queryClient.invalidateQueries({
      queryKey: queryKey.chat.chatRoomList
    });
  };

  return { pinnedChatRoomList, unPinnedChatRoomList, togglePin };
};

export default useChatList;
