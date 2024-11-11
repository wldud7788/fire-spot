import {
  ChatAttendeeUpdate,
  ChatRoomMessageInfo,
  MessagesByDate
} from "../types/chat.types";

/** 하나의 리스트로 되어 있는 메시지를 날짜별로 분리 */
export const convertMessageListToMessagesByDate = (
  messageList: ChatRoomMessageInfo[] | undefined
) => {
  if (!messageList) return messageList;

  const messagesByDate = messageList.reduce((acc, chatMessageInfo) => {
    const messageDate = chatMessageInfo.chatMessage.created_at.split("T")[0]; // 날짜(YYYY-MM-DD)만 추출

    // 만약 해당 날짜가 없으면 배열을 생성
    if (!acc[messageDate]) {
      acc[messageDate] = [];
    }

    // 날짜별로 메시지를 추가
    acc[messageDate].push(chatMessageInfo);
    return acc;
  }, {} as MessagesByDate);

  return messagesByDate;
};
