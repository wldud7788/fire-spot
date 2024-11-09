import React, { useState } from "react";
import { ChatMessagePost, ChatRoomMessageInfo } from "./types/chat.types";
import { cn } from "@/_lib/utils";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import { postChatMessage } from "./service/chatService";

type Props = {
  chatMessage: ChatRoomMessageInfo[] | undefined;
  loginUserId: string;
  roomId: number;
};

const ChatRoomMessageSection = ({
  chatMessage,
  loginUserId,
  roomId
}: Props) => {
  const [messageInput, setMessageInput] = useState("");

  if (!chatMessage) return <>채팅 목록 불러오는중</>;

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessageInput(e.target.value);
  };

  const sendMessage = async () => {
    const messagePost = {
      message: messageInput,
      room_id: roomId,
      user_id: loginUserId
    } as ChatMessagePost;

    postChatMessage(messagePost);
  };

  return (
    <div>
      {chatMessage.map((message) => (
        <div
          key={message.chatMessage.id}
          className={cn(
            loginUserId === message.chatMessage.user_id ? "ml-20" : "",
            "mb-10"
          )}
        >
          <p>{message.profile.nickname}</p>
          <p>{message.chatMessage.message}</p>
          <p>
            {format(message.chatMessage.created_at, "aa hh:mm", {
              locale: ko
            })}
          </p>
        </div>
      ))}
      <input type="text" value={messageInput} onChange={handleChangeInput} />
      <button onClick={sendMessage}>버튼</button>
    </div>
  );
};

export default ChatRoomMessageSection;
