import React from "react";
import { ChatRoomTitle } from "./types/chat.types";

type Props = {
  chatRoomTitle: ChatRoomTitle | undefined;
};

const ChatRoomTitleSection = ({ chatRoomTitle }: Props) => {
  if (!chatRoomTitle) return <>더미 채팅방 헤더</>;
  const { meet, headcount } = chatRoomTitle;

  return (
    <div className="mb-20 flex gap-4">
      {meet.title}
      {headcount}명
    </div>
  );
};

export default ChatRoomTitleSection;
