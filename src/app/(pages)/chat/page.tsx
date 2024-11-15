"use client";

import ChatListCard from "@/_components/chat/ChatListCard";
import useChatAttendee from "@/_components/chat/hooks/useChatAttendee";
import useChatList from "@/_components/chat/hooks/useChatList";
import { useChatSubscriptionRoomList } from "@/_components/chat/hooks/useChatSubscriptionRoomList";
import PageTitle from "@/_components/common/PageTitle";
import React from "react";

const ChatList = () => {
  const { pinnedChatRoomList, unPinnedChatRoomList } = useChatList();
  const { togglePin, handleMessageRead } = useChatAttendee();

  useChatSubscriptionRoomList();

  return (
    <div className="mb-[60px] mt-[40px]">
      <div className="inner m-auto w-full max-w-[1360px] px-[30px]">
        <PageTitle text={"대화 모아보기"} />

        <div className="mb-[30px] mt-[50px] flex items-center justify-between border-b-2 border-b-[#BFBFBF] pb-[16px]">
          <div className="flex items-center gap-[7px]">
            <button
              type="button"
              className="rounded-[20px] bg-[#FFB180] px-[16px] py-[7px] text-[14px] font-bold text-white"
            >
              진행중
            </button>
            <button
              className="rounded-[20px] border border-[#a6a6a6] bg-[#fff] px-[16px] py-[7px] text-[14px] font-bold text-[#404040]"
              type="button"
            >
              종료됨
            </button>
          </div>
          <div className="flex items-center gap-[7px]">
            <button
              type="button"
              className="rounded-[20px] bg-[#FFB180] px-[16px] py-[7px] text-[14px] font-bold text-white"
            >
              최신순
            </button>
            <button
              className="rounded-[20px] border border-[#FFB180] bg-[#fff] px-[16px] py-[7px] text-[14px] font-bold text-[#FFB180]"
              type="button"
            >
              오래된 순
            </button>
          </div>
        </div>

        <div className="flex flex-col">
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
      </div>
    </div>
  );
};

export default ChatList;
