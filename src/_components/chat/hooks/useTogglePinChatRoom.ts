import { useQueryClient } from "@tanstack/react-query";
import { patchChatAttendee } from "../service/chatService";
import { ChatAttendeeUpdate } from "../types/chat.types";
import { queryKey } from "@/_utils/reactQuery/queryKey.keys";

const useTogglePinChatRoom = () => {
  const queryClient = useQueryClient();

  const togglePin = async (userId: string, roomId: number, isPin: boolean) => {
    const chatAttendee = {
      is_pin: isPin
    } as ChatAttendeeUpdate;

    await patchChatAttendee(userId, roomId, chatAttendee);

    queryClient.invalidateQueries({
      queryKey: queryKey.chat.chatRoomList
    });
  };

  return { togglePin };
};

export default useTogglePinChatRoom;
