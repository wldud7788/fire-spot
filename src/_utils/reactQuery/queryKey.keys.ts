export const queryKey = {
  chat: {
    chatRoomList: ["chatRoomList"] as string[],
    chatRoomTitle: (roomId: number) =>
      ["chatRoomTitle", roomId.toString()] as string[],
    chatRoomMessage: (roomId: number) =>
      ["chatRoomMessage", roomId.toString()] as string[],
    chatRoom: (roomId: number) => ["chatRoom", roomId.toString()] as string[]
  },
  sos: {
    sosCountByProgress: ["sosCountByProgress"]
  }
};
