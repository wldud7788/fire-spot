// join 등 복잡한 쿼리는 rpc로 작성
const supabaseRpc = {
  meet: {
    getMeetDetail: "get_meet_detail",
    getMeetList: "get_meet_list"
  },
  chat: {
    getChatRoomList: "get_chat_room_list",
    getChatRoomTitle: "get_chat_room_title"
  }
} as const;

export default supabaseRpc;
