"use client";

import ChatListCard from "@/_components/chat/ChatListCard";
import useChatAttendee from "@/_components/chat/hooks/useChatAttendee";
import useChatList from "@/_components/chat/hooks/useChatList";
import { useChatSubscriptionRoomList } from "@/_components/chat/hooks/useChatSubscriptionRoomList";
import React from "react";

const ChatList = () => {
  const { pinnedChatRoomList, unPinnedChatRoomList } = useChatList();
  const { togglePin, handleMessageRead } = useChatAttendee();

  useChatSubscriptionRoomList();

  return (
    <div>
      {pinnedChatRoomList.map((chatRoomInfo) => (
        <ChatListCard
          key={chatRoomInfo.chatRoom.id}
          chatRoomInfo={chatRoomInfo}
          togglePin={togglePin}
          handleMessageRead={handleMessageRead}
        />
      ))}
      {unPinnedChatRoomList.map((chatRoomInfo) => (
        <ChatListCard
          key={chatRoomInfo.chatRoom.id}
          chatRoomInfo={chatRoomInfo}
          togglePin={togglePin}
          handleMessageRead={handleMessageRead}
        />
      ))}
    </div>
  );
};

export default ChatList;
