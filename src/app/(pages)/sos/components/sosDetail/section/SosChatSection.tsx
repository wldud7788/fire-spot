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
    <div>
      <ul>
        {/* 날짜별로 메시지 그룹 출력 */}
        {Object.keys(messagesByDate).map((date) => (
          <li key={date}>
            {date}
            {/* 날짜 하위 메시지 목록 출력 */}
            <ul className="mb-10">
              {messagesByDate[date].map((messageInfo) => (
                <li key={messageInfo.chatMessage.id} className="mb-10">
                  <p>{messageInfo.profile.nickname}</p>
                  <p>{messageInfo.chatMessage.message}</p>
                  <p>{formatDate_6(messageInfo.chatMessage.created_at)}</p>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
      {/* 입력 필드 */}
      <input type="text" value={messageInput} onChange={handleChangeInput} />
      <button onClick={sendMessage}>버튼</button>
    </div>
  );
};

export default SosChatSection;
