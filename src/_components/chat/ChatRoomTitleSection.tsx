import React from "react";
import { ChatRoomTitle } from "./types/chat.types";

type Props = {
  chatRoomTitle: ChatRoomTitle | undefined;
};

const ChatRoomTitleSection = ({ chatRoomTitle }: Props) => {
  if (!chatRoomTitle) return <>더미 채팅방 헤더</>;
  const { meet, headcount } = chatRoomTitle;

  return (
    <div className="flex items-center gap-[12px] border-b-2 border-[#FFD0B2] bg-[#FFD0B2] px-[30px] py-[25px]">
      <p className="text-[18px] font-medium">{meet.title}</p>
      <span className="color-gray02 bg-chatUser bg-left-center-0 bg-no-repeat pl-[15px] text-[14px]">
        {headcount}
      </span>
    </div>
  );
};

export default ChatRoomTitleSection;
