import { MessagesByDate } from "./types/chat.types";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import { useChatRoomMessageSection } from "./hooks/useChatRoomMessageSection";

type Props = {
  loginUserId: string;
  roomId: number;
  messagesByDate: MessagesByDate | undefined;
};

const ChatRoomMessageSection = ({
  loginUserId,
  roomId,
  messagesByDate
}: Props) => {
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
                  <p>
                    {format(messageInfo.chatMessage.created_at, "aa hh:mm", {
                      locale: ko
                    })}
                  </p>
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
    // <div>
    //   {chatMessage.map((message) => (
    //     <div
    //       key={message.chatMessage.id}
    //       className={cn(
    //         loginUserId === message.chatMessage.user_id ? "ml-20" : "",
    //         "mb-10"
    //       )}>
    //       <p>{message.profile.nickname}</p>
    //       <p>{message.chatMessage.message}</p>
    //       <p>
    //         {format(message.chatMessage.created_at, "aa hh:mm", {
    //           locale: ko
    //         })}
    //       </p>
    //     </div>
    //   ))}
    //   <input type="text" value={messageInput} onChange={handleChangeInput} />
    //   <button onClick={sendMessage}>버튼</button>
    // </div>
  );
};

export default ChatRoomMessageSection;
