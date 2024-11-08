export const convertMessageListToTable = () => {};

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
