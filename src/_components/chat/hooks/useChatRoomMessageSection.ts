import { useState } from "react";
import { postChatMessage } from "../service/chatService";
import { ChatMessageInsert } from "../types/chat.types";

export const useChatRoomMessageSection = (
  roomId: number,
  loginUserId: string
) => {
  const [messageInput, setMessageInput] = useState("");

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessageInput(e.target.value);
  };

  const sendMessage = async () => {
    const messagePost = {
      message: messageInput,
      room_id: roomId,
      user_id: loginUserId
    } as ChatMessageInsert;

    await postChatMessage(messagePost);
    setMessageInput("");
  };

  return { messageInput, handleChangeInput, sendMessage };
};
