import { queryKey } from "@/_utils/reactQuery/queryKey.keys";
import { createClient } from "@/_utils/supabase/client";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useRef } from "react";
import { ChatAttendeeUpdate, ChatMessageSelect } from "../types/chat.types";
import {
  fetchLastChatMessage,
  patchChatAttendee
} from "../service/chatService";

export const useChatSubscriptionMessageList = ({
  userId,
  roomId
}: {
  userId?: string;
  roomId: number;
}) => {
  const supabase = createClient();
  const queryClient = useQueryClient();

  // 마지막으로 읽은 message_id를 계속 추적함 (안 읽은 메시지 수 계산을 위함)
  const lastChatMessageIdRef = useRef<number | null>(null);

  /** 채팅방 입/퇴장 시 마지막 읽은 메시지에 대한 처리 */
  const toggleChatRoomInOut = async (last_read_message_id: number | null) => {
    const chatAttendee = {
      last_read_message_id: last_read_message_id
    } as ChatAttendeeUpdate;

    // sos 같은 경우 채팅 참여자 데이터 필요 없음 (userId의 유무로 판단)
    if (userId) {
      // 입장 시 마지막 읽은 메시지 null, 퇴장 시 마지막 읽은 메시지 id update
      await patchChatAttendee(userId, roomId, chatAttendee);

      //  입장/퇴장 시 is_first_read true (최초로 참여한 채팅방의 경우 안 읽은 메시지 수 표시가 정상적으로 안되었는데 이거 추가해서 해결함)
      await patchChatAttendee(userId, roomId, { is_first_read: true });
    }
  };

  /** 채팅방 입장 시 마지막 읽은 메시지 DB에서 가져와서 ref에 저장. null 일 경우 ref 초기값(null) 그대로  */
  const fetchLastMessage = async () => {
    const message = await fetchLastChatMessage(roomId);
    if (message) {
      lastChatMessageIdRef.current = message.id;
    }
  };

  /** 채팅 메시지 실시간 구독  */
  useEffect(() => {
    toggleChatRoomInOut(null);
    fetchLastMessage();

    const channel = supabase
      .channel("schema-db-changes")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "chat_message"
        },
        (payload) => {
          // 신규 message_id를 계속 참조함 (언마운트시 마지막으로 읽은 메시지 수 계산을 위함)
          const chatMessage = payload.new as ChatMessageSelect;
          lastChatMessageIdRef.current = chatMessage.id;

          queryClient.invalidateQueries({
            queryKey: queryKey.chat.chatRoomMessage(roomId)
          });
        }
      )
      .subscribe();

    // 언마운트 시 마지막 message_id를 db에 저장
    return () => {
      toggleChatRoomInOut(lastChatMessageIdRef.current);
      channel.unsubscribe();
    };
  }, []);
};
