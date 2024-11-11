"use client";

import ChatListCard from "@/_components/chat/ChatListCard";
import useChatList from "@/_components/chat/hooks/useChatList";
import { useChatSubscriptionRoomList } from "@/_components/chat/hooks/useChatSubscriptionRoomList";
import React from "react";

const ChatList = () => {
  const { pinnedChatRoomList, unPinnedChatRoomList } = useChatList();
  useChatSubscriptionRoomList();

  return (
    <div>
      {pinnedChatRoomList.map((chatRoomInfo) => (
        <ChatListCard
          key={chatRoomInfo.chatRoom.id}
          chatRoomInfo={chatRoomInfo}
        />
      ))}
      {unPinnedChatRoomList.map((chatRoomInfo) => (
        <ChatListCard
          key={chatRoomInfo.chatRoom.id}
          chatRoomInfo={chatRoomInfo}
        />
      ))}
    </div>
  );
};

export default ChatList;
