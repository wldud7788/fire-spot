import React from "react";
import { ChatRoomInfo } from "./types/chat.types";
import Link from "next/link";
import { SERVER_PAGE_URL } from "@/_utils/common/constant";
import { formatDate_6, formatDate_7 } from "@/_utils/common/dateFormat";

type Props = {
  chatRoomInfo: ChatRoomInfo;
  togglePin: (roomId: number, isPin: boolean) => Promise<void>;
  handleMessageRead: (roomId: number, messageId: number) => Promise<void>;
};

const ChatListCard = ({
  chatRoomInfo,
  togglePin,
  handleMessageRead
}: Props) => {
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
    <div className="w-full border-b-2 border-[#D9D9D9] py-[14px]">
      <div className="flex items-center justify-end gap-[3px]">
        {chatAttendee.is_pin && (
          <button
            className="rounded-[6px] border border-[#D9D9D9] bg-[#D9D9D9] p-[10px] text-[12px] text-[#737373]"
            onClick={() => togglePin(chatRoom.id, false)}
          >
            핀 해제
          </button>
        )}
        {!chatAttendee.is_pin && (
          <button
            className="rounded-[6px] border border-[#ff924c] bg-[#ff924c] p-[10px] text-[12px] text-[#fff]"
            onClick={() => togglePin(chatRoom.id, true)}
          >
            핀 고정
          </button>
        )}

        <button
          className="rounded-[6px] border border-[#ff924c] p-[10px] text-[12px] text-[#ff924c]"
          onClick={() => handleMessageRead(chatRoom.id, chatMessage.id)}
        >
          읽음 처리
        </button>
      </div>
      <div className="flex items-center">
        <div className="left_area flex w-full max-w-[70%] items-center gap-[20px]">
          <div className="h-[74px] w-[74px] overflow-hidden rounded-full bg-[#d9d9d9]">
            <img
              src={profile?.avatar_url || ""}
              alt={`${profile?.nickname || ""} 프로필 사진`}
              className="h-full w-full object-cover"
            />
          </div>
          <Link href={SERVER_PAGE_URL.chatRoom(chatRoom.id)}>
            <strong className="color-gray01 text-[18px] font-bold">
              {meet.title}
            </strong>
            <p className="my-[5px]">
              {chatMessage?.message || "아직 메시지 없음"}
            </p>
            <span className="color-gray03 bg-chatUser bg-left-center-0 bg-no-repeat pl-[16px] text-[14px]">
              {headcount}명
            </span>
          </Link>
        </div>
        <div className="right_area flex w-[30%] flex-none flex-col items-end justify-end">
          <p className="text-[14px] text-[#787878]">
            {formatDate_6(chatMessage?.created_at || "") || ""}
          </p>
          <p
            className={`${unreadCount ? "bg-main" : "bg-[#d9d9d9]"} min-w-[40px] rounded-[16px] px-[10px] py-[4px] text-center text-[18px] font-medium text-white`}
          >
            {unreadCount}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ChatListCard;
