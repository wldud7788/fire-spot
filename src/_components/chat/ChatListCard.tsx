import React from "react";
import { ChatRoomInfo } from "./types/chat.types";
import Link from "next/link";
import { SERVER_PAGE_URL } from "@/_utils/common/constant";

type Props = {
  chatRoomInfo: ChatRoomInfo;
  togglePin: (roomId: number, isPin: boolean) => Promise<void>;
};

const ChatListCard = ({ chatRoomInfo, togglePin }: Props) => {
  const {
    chatAttendee,
    chatRoom,
    chatMessage,
    profile,
    headcount,
    meet,
    unreadCount
  } = chatRoomInfo;

  // 채팅 메시지가 한 개도 없는 경우 프로필 정보 없음
  return (
    <div className="mb-10 flex gap-4 border-2 border-black">
      안읽은 메시지 {unreadCount}
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
      <div>
        {chatAttendee.is_pin && (
          <button
            className="border-2 border-gray-500"
            onClick={() => togglePin(chatRoom.id, false)}
          >
            핀 해제
          </button>
        )}
        {!chatAttendee.is_pin && (
          <button
            className="border-2 border-gray-500"
            onClick={() => togglePin(chatRoom.id, true)}
          >
            핀 고정
          </button>
        )}

        <button className="border-2 border-gray-500">읽음 처리</button>
      </div>
    </div>
  );
};

export default ChatListCard;
