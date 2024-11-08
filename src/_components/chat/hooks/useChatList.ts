import { useQuery } from "@tanstack/react-query";
import { queryKey } from "@/_utils/reactQuery/queryKey.keys";
import { ChatRoomInfo } from "../types/chat.types";
import { fetchChatRoomList } from "../service/chatService";

const useChatList = () => {
  const { data: chatRoomList = [] as ChatRoomInfo[], error } = useQuery<
    ChatRoomInfo[]
  >({
    queryKey: queryKey.chat.chatRoomList,
    // queryFn: async () => {
    //   const res = await fetch(SERVER_API_URL.chatRoomList, { method: "GET" });
    //   const data = await res.json();
    //   return data;
    // }
    queryFn: () => fetchChatRoomList()
  });
  if (error) throw new Error(error.message);

  return { chatRoomList };
};

export default useChatList;
