import React from "react";
import { ChatRoomInfo } from "./types/chat.types";
import Link from "next/link";
import { SERVER_PAGE_URL } from "@/_utils/common/constant";

type Props = {
  chatRoomInfo: ChatRoomInfo;
};

const ChatListCard = ({ chatRoomInfo }: Props) => {
  const { chatAttendee, chatRoom, chatMessage, profile, headcount, meet } =
    chatRoomInfo;

  // 채팅 메시지가 한 개도 없는 경우 프로필 정보 없음
  return (
    <div className="mb-10 flex gap-4">
      {chatAttendee.is_pin && "핀 버튼"}
      <div>
        <img
          src={profile?.avatar_url || ""}
          alt={`${profile?.nickname || ""} 프로필 사진`}
          className="h-[30px] w-[30px]"
        />
      </div>
      <div>
        <Link href={SERVER_PAGE_URL.chatRoom(chatRoom.id)}>
          <p>{meet.title}</p>
          <p>
            {chatMessage?.message || "아직 메시지 없음"} /{" "}
            {chatMessage?.created_at || ""}
          </p>
          {headcount} 명
        </Link>
      </div>
      <button>뭐 이상한 버튼</button>
    </div>
  );
};

export default ChatListCard;
