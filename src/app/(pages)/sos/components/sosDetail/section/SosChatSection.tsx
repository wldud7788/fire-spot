import { useChatRoomMessageSection } from "@/_components/chat/hooks/useChatRoomMessageSection";
import {
  ChatRoomSelect,
  MessagesByDate
} from "@/_components/chat/types/chat.types";
import { formatDate_6 } from "@/_utils/common/dateFormat";
import { profile } from "console";
import React, { MutableRefObject, useEffect, useRef } from "react";
type Props = {
  loginUserId: string;
  roomId: number;
  messagesByDate: MessagesByDate | undefined;
  lastChatMessageUserIdRef: MutableRefObject<string | null>;
};
const SosChatSection = ({
  loginUserId,
  roomId,
  messagesByDate,
  lastChatMessageUserIdRef
}: Props) => {
  const { messageInput, handleChangeInput, sendMessage } =
    useChatRoomMessageSection(roomId, loginUserId);

  // ul 요소에 대한 ref
  const messageListRef = useRef<HTMLUListElement | null>(null);

  useEffect(() => {
    // messagesByDate가 변경될 때마다 마지막 메시지로 스크롤을 이동
    if (
      messageListRef.current &&
      loginUserId === lastChatMessageUserIdRef.current
    ) {
      messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
    }
  }, [messagesByDate]); // messagesByDate가 변경될 때마다 실행

  if (!messagesByDate) return <>채팅 목록 불러오는중</>;
  return (
    <div className="min-h-[400px] rounded-[12px] bg-[#FFEFE5] p-[40px]">
      <ul
        className="no-scrollbar max-h-[700px] overflow-y-auto"
        ref={messageListRef}
      >
        {/* 날짜별로 메시지 그룹 출력 */}
        {Object.keys(messagesByDate).map((date) => (
          <li key={date}>
            <div className="flex items-center justify-center">
              <strong className="rounded-[50px] bg-[#FFD0B2] px-[16px] py-[8px] text-[#B24600]">
                {date}
              </strong>
            </div>
            {/* 날짜 하위 메시지 목록 출력 */}
            <ul className="mb-10">
              {messagesByDate[date].map((messageInfo) => (
                <li
                  key={messageInfo.chatMessage.id}
                  className={`mb-10 flex items-start gap-[4px] ${
                    // 로그인 유저와 작성자가 같으면 오른쪽에 위치하는 조건문?
                    loginUserId === messageInfo.chatMessage.user_id
                      ? "justify-end"
                      : ""
                  }`}
                >
                  <div
                    className={`h-[45px] w-[45px] overflow-hidden rounded-full bg-[#d9d9d9] ${loginUserId === messageInfo.chatMessage.user_id ? "hidden" : ""}`}
                  >
                    <img
                      className="h-full w-full object-cover"
                      src={
                        messageInfo.profile.avatar_url ||
                        "/assets/images/default_profile.jpeg"
                      }
                      alt=""
                    />
                  </div>
                  <div
                    className={`${loginUserId === messageInfo.chatMessage.user_id ? "flex flex-col items-end justify-end" : ""}`}
                  >
                    <strong className={`color-[#909090] text-[14px]`}>
                      {messageInfo.profile.nickname}
                    </strong>
                    <div className={`flex items-end gap-[7px]`}>
                      <p
                        className={`bg-[#FFD0B2] px-[18px] py-[15px] text-[16px] ${loginUserId === messageInfo.chatMessage.user_id ? "order-1 rounded-bl-[24px] rounded-br-[24px] rounded-tl-[24px] rounded-tr-[3px]" : "rounded-bl-[24px] rounded-br-[24px] rounded-tl-[3px] rounded-tr-[24px]"}`}
                      >
                        {messageInfo.chatMessage.message}
                      </p>
                      <p
                        className={`pb-[10px] text-[12px] text-[#9b9b9b] ${loginUserId === messageInfo.chatMessage.user_id ? "order-0" : ""}`}
                      >
                        {formatDate_6(messageInfo.chatMessage.created_at)}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
      {/* 입력 필드 */}
      <div className="relative">
        <input
          type="text"
          className="h-[190px] w-full rounded-[12px] border border-[#A8A8A8] p-[15px]"
          value={messageInput}
          onChange={handleChangeInput}
        />
        <button
          className="absolute bottom-[16px] right-[16px] rounded-[8px] bg-[#F2F2F2] px-[28px] py-[12px]"
          onClick={sendMessage}
        >
          전송
        </button>
      </div>
    </div>
  );
};

export default SosChatSection;
