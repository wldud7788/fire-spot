import { useChatRoomMessageSection } from "@/_components/chat/hooks/useChatRoomMessageSection";
import {
  ChatRoomSelect,
  MessagesByDate
} from "@/_components/chat/types/chat.types";
import { formatDate_6 } from "@/_utils/common/dateFormat";
import React from "react";
type Props = {
  loginUserId: string;
  roomId: number;
  messagesByDate: MessagesByDate | undefined;
};
const SosChatSection = ({ loginUserId, roomId, messagesByDate }: Props) => {
  const { messageInput, handleChangeInput, sendMessage } =
    useChatRoomMessageSection(roomId, loginUserId);

  if (!messagesByDate) return <>채팅 목록 불러오는중</>;
  return (
    <div className="rounded-[12px] bg-[#FFEFE5] p-[40px]">
      <ul>
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
                  className="mb-10 flex items-start gap-[4px]"
                >
                  <div className="h-[45px] w-[45px] overflow-hidden rounded-full bg-[#d9d9d9]">
                    <img className="h-full w-full object-cover" src="" alt="" />
                  </div>
                  <div>
                    <strong className="color-[#909090] text-[14px]">
                      {messageInfo.profile.nickname}
                    </strong>
                    <div className="flex items-end gap-[7px]">
                      <p className="rounded-bl-[24px] rounded-br-[24px] rounded-tl-[3px] rounded-tr-[24px] bg-[#FFD0B2] px-[18px] py-[15px] text-[16px]">
                        {messageInfo.chatMessage.message}
                      </p>
                      <p className="pb-[10px] text-[12px] text-[#9b9b9b]">
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
