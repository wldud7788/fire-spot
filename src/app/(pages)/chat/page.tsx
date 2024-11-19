"use client";

import ChatListCard from "@/_components/chat/ChatListCard";
import useChatAttendee from "@/_components/chat/hooks/useChatAttendee";
import useChatList from "@/_components/chat/hooks/useChatList";
import { useChatSubscriptionRoomList } from "@/_components/chat/hooks/useChatSubscriptionRoomList";
import NoData from "@/_components/common/NoData";
import PageTitle from "@/_components/common/PageTitle";
import { SERVER_PAGE_URL } from "@/_utils/common/constant";
import Link from "next/link";
import React from "react";

const ChatList = () => {
  const { hasChatAttendee, pinnedChatRoomList, unPinnedChatRoomList } =
    useChatList();
  const { togglePin, handleMessageRead } = useChatAttendee();

  useChatSubscriptionRoomList();

  console.log("pinnedChatRoomList", pinnedChatRoomList);

  return (
    <div className="mb-[60px] mt-[40px]">
      <div className="inner m-auto w-full max-w-[1360px] px-[30px] max-767:px-[15px]">
        <PageTitle text={"대화목록"} />

        <div className="mt-[50px] flex items-center justify-between border-b-2 border-b-[#BFBFBF] pb-[16px] max-767:mt-[20px]">
          {/* <div className="flex items-center gap-[7px]">
            <button
              type="button"
              className="rounded-[20px] bg-[#FFB180] px-[16px] py-[7px] text-[14px] font-bold text-white max-1280:text-[13px]"
            >
              진행중
            </button>
            <button
              className="rounded-[20px] border border-[#a6a6a6] bg-[#fff] px-[16px] py-[7px] text-[14px] font-bold text-[#404040] max-1280:text-[13px]"
              type="button"
            >
              종료됨
            </button>
          </div>
          <div className="flex items-center gap-[7px]">
            <button
              type="button"
              className="rounded-[20px] bg-[#FFB180] px-[16px] py-[7px] text-[14px] font-bold text-white max-1280:text-[13px]"
            >
              최신순
            </button>
            <button
              className="rounded-[20px] border border-[#FFB180] bg-[#fff] px-[16px] py-[7px] text-[14px] font-bold text-[#FFB180] max-1280:text-[13px]"
              type="button"
            >
              오래된 순
            </button>
          </div> */}
        </div>

        {hasChatAttendee ? (
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
        ) : (
          <div className="mt-10">
            <Link href={SERVER_PAGE_URL.meets}>
              <NoData text="아직 참여한 모임이 없습니다." />
            </Link>
          </div>
        )}

        {/* <div className="flex flex-col">
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
        </div> */}
      </div>
    </div>
  );
};

export default ChatList;
