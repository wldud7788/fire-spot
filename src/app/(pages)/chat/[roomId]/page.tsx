"use client";

import ChatRoomMessageSection from "@/_components/chat/ChatRoomMessageSection";
import ChatRoomTitleSection from "@/_components/chat/ChatRoomTitleSection";
import { useChatSubscriptionMessageList } from "@/_components/chat/hooks/useChatSubscriptionMessageList";
import {
  useChatRoomMessage,
  useChatRoomTitle
} from "@/_components/chat/hooks/useChatRoom";
import useUser from "@/_hooks/useUser";
import React, { useEffect } from "react";

type Props = {
  params: {
    roomId: string;
  };
};

const ChatRoom = ({ params }: Props) => {
  // 미들웨어에서 접근 차단 및 roomId NaN 같은거 나와도 차단
  const roomId = Number(params.roomId);
  const user = useUser();
  const { chatRoomTitle } = useChatRoomTitle(roomId);
  const { chatMessage } = useChatRoomMessage(roomId);
  useChatSubscriptionMessageList(user?.id || "", roomId);

  useEffect(() => {
    return () => {};
  }, []);

  if (!user) return <></>;

  return (
    <div>
      <ChatRoomTitleSection chatRoomTitle={chatRoomTitle} />
      <ChatRoomMessageSection
        loginUserId={user.id}
        roomId={roomId}
        chatMessage={chatMessage}
      />
    </div>
  );
};

export default ChatRoom;
