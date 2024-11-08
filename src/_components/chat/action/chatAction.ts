import { Order, ORDER_STRING } from "@/types/order.types";

/** 
 * userId 기준으로 채팅방 목록 가져옴 
 * 
* select 
    C.*, 
    M.title, 
    S.title 
  from chat_room C 
  left outer join meet M 
    on C.meet_id = M.id 
  left outer join sos S
    on C.sos_id = S.id
  where C.user_id = {userId}
 * 
*/
export const fetchChatRoomListByUserId = (order: Order = ORDER_STRING.desc) => {
  // const sortedData = data.sort((a, b) => {
  //   if (a.is_pin && !b.is_pin) return -1;
  //   if (!a.is_pin && b.is_pin) return 1;
  //   return a.id - b.id;
  // });
};

/**
 * 채팅방에 들어갔을 때 메시지 목록 호출
 *
 * {
 *   "2024-10-17":[
 *      {
 *
 *       }
 *    ]
 * }
 *
 * [
 *  {
 *    id:
 *  }
 * ]
 */

const a = {
  "2024-10-17": [
    {
      id: 1,
      nickname: "닉네임자리",
      unreadCount: 1, // 안읽은 사람 수
      sendTime: "오전 12:05",
      message: "지금 뭐함"
      // isSentByMe:false, // 내가 보낸 메시지 (오른쪽에 표시)
    },
    {
      id: 2,
      nickname: "내 닉네임",
      unreadCount: 1, // 안읽은 사람 수
      sendTime: "오전 12:05",
      message: "지금 뭐함"
      // isSentByMe:uid, // 내가 보낸 메시지 (오른쪽에 표시) 이거 그냥 로그인 유저 기준 클라이언트에서 비교해서
    }
  ]
};

/**
 * 
 * last_read가 가장 중요한 역할 ?

- 사용자가 들어온 시점
- 사용자가 나간 시점
- 해당 방에서 신규 메시지가 전송된 경우 이벤트를 받은 모든 사용자에 한하여 

위 경우에 해당하여 last_read를 업데이트


그리고 
 */

export const fetchChatMessageByRoomId = (roomId: number) => {};
