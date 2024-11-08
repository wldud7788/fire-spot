export const DEADLINE_APPROACHING = 3;

export const MIN_HEADCOUNT = 3;
export const MAX_HEADCOUNT = 20;

export const SERVER_API_URL = {
  chatRoomList: "/api/chat-rooms"
};

export const SERVER_PAGE_URL = {
  chat: "/chat",
  chatRoom: (roomId: number) => `/chat/${roomId}`
};
