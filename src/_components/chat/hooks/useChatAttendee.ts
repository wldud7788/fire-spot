import useUser from "@/_hooks/useUser";
import { useQueryClient } from "@tanstack/react-query";
import { patchChatAttendee } from "../service/chatService";
import { queryKey } from "@/_utils/reactQuery/queryKey.keys";

const useChatAttendee = () => {
  const queryClient = useQueryClient();
  const user = useUser();
  const userId = user?.id || "";

  /** 핀 고정 토글 함수  */
  const togglePin = async (roomId: number, isPin: boolean) => {
    const chatAttendee = {
      is_pin: isPin
    };

    await patchChatAttendee(userId, roomId, chatAttendee);

    queryClient.invalidateQueries({
      queryKey: queryKey.chat.chatRoomList
    });
  };

  /** 메시지 읽음 처리 함수 */
  const handleMessageRead = async (roomId: number, messageId: number) => {
    const chatAttendee = {
      last_read_message_id: messageId
    };

    await patchChatAttendee(userId, roomId, chatAttendee);

    queryClient.invalidateQueries({
      queryKey: queryKey.chat.chatRoomList
    });
  };

  return { togglePin, handleMessageRead };
};

export default useChatAttendee;
