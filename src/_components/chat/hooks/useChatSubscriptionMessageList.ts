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
  roomId,
  type
}: {
  userId?: string;
  type?: string;
  roomId: number;
}) => {
  const supabase = createClient();
  const queryClient = useQueryClient();

  // 마지막으로 읽은 message_id를 계속 추적함 (안 읽은 메시지 수 계산을 위함)
  const lastChatMessageIdRef = useRef<number | null>(null);

  // 마지막으로 전송한 user_id를 추적함 (내가 보낸 메시지에 한해서만 스크롤 이동 조건 처리를 위함)
  const lastChatMessageUserIdRef = useRef<string | null>(null);

  // 채팅방 목록 ul을 참조함 (메시지 전송 시 스크롤 이동을 위함)
  const messageListRef = useRef<HTMLUListElement | null>(null);

  // 입장 시점의 마지막으로 전송된 message의 element를 참조함 (채팅방 입장 시 마지막 메시지 element로 스크롤 이동을 위함)
  const lastMessageRef = useRef<{ [key: number]: HTMLLIElement | null }>({});

  /** 채팅방 입/퇴장 시 마지막 읽은 메시지에 대한 처리 */
  const toggleChatRoomInOut = async (last_read_message_id: number | null) => {
    const chatAttendee = {
      last_read_message_id: last_read_message_id
    } as ChatAttendeeUpdate;

    // sos 같은 경우 채팅 참여자 데이터 필요 없음 (type으로 판단)
    if (type === "meet" && !!userId) {
      // 입장 시 마지막 읽은 메시지 null, 퇴장 시 마지막 읽은 메시지 id update
      await patchChatAttendee(userId, roomId, chatAttendee);

      //  입장/퇴장 시 is_first_read true (최초로 참여한 채팅방의 경우 안 읽은 메시지 수 표시가 정상적으로 안되었는데 이거 추가해서 해결함)
      await patchChatAttendee(userId, roomId, { is_first_read: true });
    }
  };

  /**
   * 채팅방 입장 시 마지막 읽은 메시지 DB에서 가져와서 ref에 저장. null 일 경우 ref 초기값(null) 그대로
   * 채팅방 나갈 때 last_read_message_id를 저장해주기 위함
   */
  const fetchLastMessage = async () => {
    const message = await fetchLastChatMessage(roomId);
    if (message) {
      lastChatMessageIdRef.current = message.id;
      lastChatMessageUserIdRef.current = message.user_id;

      /** 채팅방 입장 시 마지막 메시지로 포커싱 */
      const messageElement = lastMessageRef.current[message.id];
      if (messageElement) {
        // 메시지로 스크롤
        messageElement.scrollIntoView({
          behavior: "instant",
          block: "start"
        });
      }
    }
  };

  /**
   * 채팅 메시지 실시간 구독
   *
   * 1. supabase의 realtime을 적용하여 chat_message 테이블에 insert되면 payload로 값을 전달 받음
   *
   * 2. 신규 message_id를 참조함
   * (채팅방 퇴장 시 chat_attendee 테이블의 last_read_message_id 저장 마지막으로 읽은 메시지 수 계산을 위함)
   *
   * 3. 신규 메시지를 전송한 user_id를 참조함
   * (내가 메시지를 보낸 경우에만 스크롤을 내리기 때문에 해당 조건처리를 위함)
   *
   * 4. queryKey를 재검증하여 데이터(메시지) 새로 불러옴.
   *
   * */
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
          lastChatMessageUserIdRef.current = chatMessage.user_id;

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

  /** 마지막 메시지와 전송자가 일치하는 경우 스크롤 아래로 이동 */
  useEffect(() => {
    if (messageListRef.current && userId === lastChatMessageUserIdRef.current) {
      // 채팅 전송 시 애니메이션 없는 스크롤 이동 (애니메이션 X)
      // messageListRef.current.scrollTop = messageListRef.current.scrollHeight;

      /** 채팅 전송 시 애니메이션 있는 스크롤 이동 */
      const totalHeight = messageListRef.current.scrollHeight;

      // 부드러운 스크롤을 위해 requestAnimationFrame을 사용
      const smoothScrollToBottom = () => {
        const start = messageListRef?.current?.scrollTop || 0;
        const distance = totalHeight - start; // scrollHeight - current scrollTop
        const duration = 500; // 스크롤 애니메이션 지속 시간 (밀리초)
        let startTime: number;

        // 스크롤 애니메이션 함수
        const animateScroll = (timestamp: number) => {
          if (messageListRef.current) {
            if (!startTime) startTime = timestamp; // 시작 시간 저장
            const progress = timestamp - startTime; // 경과 시간 계산
            const easeInOut = Math.min(progress / duration, 1); // 시간 비례로 비례적으로 변하는 비율

            messageListRef.current.scrollTop = start + distance * easeInOut;

            if (progress < duration) {
              window.requestAnimationFrame(animateScroll); // 지속적으로 애니메이션 진행
            } else {
              messageListRef.current.scrollTop = totalHeight; // 애니메이션 종료 후 정확한 최하단 위치 설정
            }
          }
        };

        window.requestAnimationFrame(animateScroll); // 애니메이션 시작
      };

      smoothScrollToBottom();
    }
  }, [lastChatMessageIdRef.current]);

  return { messageListRef, lastMessageRef };
};
