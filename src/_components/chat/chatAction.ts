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
export const fetchChatRoomListByUserId = (
  order: Order = ORDER_STRING.desc
) => {};

export const fetchChatMessageByRoomId = (roomId: number) => {};
