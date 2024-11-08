"use client";

import ChatRoomTitleSection from "@/_components/chat/ChatRoomTitleSection";
import { useChatRoomTitle } from "@/_components/chat/hooks/useChatRoom";
import React from "react";

type Props = {
  params: {
    roomId: string;
  };
};

const ChatRoom = ({ params }: Props) => {
  // 미들웨어에서 접근 차단 및 roomId NaN 같은거 나와도 차단
  const roomId = Number(params.roomId);
  const { chatRoomTitle } = useChatRoomTitle(roomId);

  console.log("params", typeof roomId);

  return (
    <div>
      <ChatRoomTitleSection chatRoomTitle={chatRoomTitle} />
    </div>
  );
};

export default ChatRoom;
