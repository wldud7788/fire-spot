export const queryKey = {
  chat: {
    chatRoomList: ["chatRoomList"],
    chatRoomTitle: (roomId: number) => ["chatRoomTitle", roomId],
    chatRoomMessage: (roomId: number) => ["chatRoomMessage", roomId],
    chatRoom: (roomId: number) => ["chatRoom", roomId]
  }
};
