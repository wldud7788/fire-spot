import { useState } from "react";
import { postChatMessage } from "../service/chatService";
import { ChatMessageInsert } from "../types/chat.types";

export const useChatRoomMessageSection = (
  roomId: number,
  loginUserId: string
) => {
  const [messageInput, setMessageInput] = useState("");
  const [activeSendButton, setActiveSendButton] = useState(false);

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessageInput(e.target.value);

    if (!!e.target.value) {
      setActiveSendButton(true);
    } else {
      setActiveSendButton(false);
    }
  };

  const sendMessage = async () => {
    const messagePost = {
      message: messageInput,
      room_id: roomId,
      user_id: loginUserId
    } as ChatMessageInsert;

    if (activeSendButton) {
      await postChatMessage(messagePost);
      setMessageInput("");
      setActiveSendButton(false);
    }
  };

  return { messageInput, handleChangeInput, sendMessage, activeSendButton };
};
