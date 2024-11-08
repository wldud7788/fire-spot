export const queryKey = {
  chat: {
    chatRoomList: ["chatRoomList"],
    chatRoomTitle: (roomId: number) => ["chatRoomTitle", roomId],
    chatRoomContent: (roomId: number) => ["chatRoomContent", roomId]
  }
};
