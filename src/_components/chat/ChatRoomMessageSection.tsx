import React from "react";
import { ChatRoomMessageInfo } from "./types/chat.types";
import { cn } from "@/_lib/utils";
import { format } from "date-fns";
import { ko } from "date-fns/locale";

type Props = {
  chatMessage: ChatRoomMessageInfo[] | undefined;
  loginUserId: string;
};

const ChatRoomMessageSection = ({ chatMessage, loginUserId }: Props) => {
  if (!chatMessage) return <>채팅 목록 불러오는중</>;

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
    </div>
  );
};

export default ChatRoomMessageSection;
