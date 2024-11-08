import { getUser } from "@/_utils/auth";
import { User } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import { fetchChatRoomList } from "../action/chatAction";

const useChatList = () => {
  const [chatRoomList, setChatRoomList] = useState<any>();

  useEffect(() => {
    const fetchChatRoomData = async () => {
      const chatRoomList = await fetchChatRoomList();

      setChatRoomList(chatRoomList);
      console.log("chatRoomList", chatRoomList);
    };
    fetchChatRoomData();
  }, []);
};

export default useChatList;
