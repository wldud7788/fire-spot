"use client";

import ChatListCard from "@/_components/chat/ChatListCard";
import useChatList from "@/_components/chat/hooks/useChatList";
import React from "react";

const ChatList = () => {
  const { chatRoomList } = useChatList();

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
