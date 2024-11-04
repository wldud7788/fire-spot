// "use client";
// import React, { useEffect } from "react";
// import { createClient } from "@/_utils/supabase/client";
// import { QueryClient, useQuery, useQueryClient } from "@tanstack/react-query";

// const GroupChatAction = () => {
//   const supabase = createClient();
//   const queryClient = useQueryClient();

//   useEffect(() => {
//     const messageSubscription = supabase
//       .channel(`${roomId}`)
//       .on(
//         "postgres_changes",
//         { event: "INSERT", schema: "public", table: "chat_messages" },

//         // 채팅 리스트 무효화 성공 - 리스트 전체를 무효화 (수정 필요)
//         (payload) => {
//           queryClient.invalidateQueries({
//             queryKey: [QUERY_KEY_MESSAGES_LIST]
//           });
//         }
//       )
//       .subscribe();

//     return () => {
//       messageSubscription.unsubscribe();
//     };
//   }, []);

//   const { messagesList, isLoading, isError } = useGetMessagesList({
//     roomId,
//     loggedInUserUid
//   });

//   if (isLoading) {
//     <div>Loading</div>;
//   }
//   if (isError || messagesList === undefined) {
//     <div>Error</div>;
//   }

//   // 메시지 보내기 핸들러
//   const handleSendMessage = async () => {
//     if (message === "") return;
//     setMessage(""); // 메시지를 전송한 후에 입력 필드의 값을 비움

//     await sendMessage({
//       sender_uid: loggedInUserUid,
//       room_id: roomId,
//       content: message
//     });
//   };

//   // action 참여 취소 핸들러
//   const handleCancelParticipate = async (onClose: () => void) => {
//     const isConfirm = window.confirm("참여를 취소하시겠습니까?");
//     if (isConfirm) {
//       // 1. 채팅방 인원 === 모집인원 인지 확인하기
//       // (맞으면 내가 나갔을때 '모집중'으로 바꿔야 함)

//       // 현재 채팅방 인원 가져오기
//       const participantsNumber = await countParticipants(roomId);

//       // action 모집인원 가져오기
//       const recruitingNumber = await getRecruitingNumber(roomId);

//       if (participantsNumber === recruitingNumber) {
//         await changeRecruitingState({ action_id: actionId, mode: "out" });
//       }

//       // 2. 참가자 테이블에서 삭제
//       await deleteParticipant(loggedInUserUid);
//     }
//     onClose();
//   };

//   return <div>GroupChatAction</div>;
// };

// export default GroupChatAction;
