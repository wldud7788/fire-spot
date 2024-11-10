"use client";

import ChatListCard from "@/_components/chat/ChatListCard";
import useChatList from "@/_components/chat/hooks/useChatList";
import { useChatOnChanges } from "@/_components/chat/hooks/useChatRealtime";
import React from "react";

const ChatList = () => {
  const { chatRoomList } = useChatList();
  useChatOnChanges();

  return (
    <div>
      {chatRoomList.map((chatRoomInfo) => (
        <ChatListCard
          key={chatRoomInfo.chatRoom.id}
          chatRoomInfo={chatRoomInfo}
        />
      ))}
    </div>
  );
};

export default ChatList;
