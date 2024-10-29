// 'use client';

// import React, { useState } from 'react';

// export const ChatInput = ({ onSubmit }) => {
//   const [message, setMessage] = useState('');
//   // 메세지 전송 펑션
//   const handleSendMessage = async (event) => {
//     //현재 로그인중인 유저의 정보 가져오기
//     //정보들이 일치하지 않으면 에러 발생
//     const { data, error } = await supabase.from('chat').insert({ message }); //데이터 넣기, 나중에 에러 변수 수정
//     console.log(data);
//     if (error) {
//       console.error('Error update comment : ', error.message);
//     }
//   };

//   //input에 value안 들어가도 값은 전송이 된다. 다만 value를 넣고 onChange를 할지 아래 것을 할지는 미지수
//   return (
//     <>
//       <input
//         className="p-3 w-full border-2 border-light-blue-600"
//         type="text"
//         placeholder="메시지를 입력하세요"
//         value={message}
//         onChange={(e) => setMessage(e.target.value)}
//         onKeyDown={(e) => {
//           if (e.key === 'Enter') {
//             //엔터 누르면 메세지 전송되게
//             handleSendMessage(e);
//             e.currentTarget.value = ''; // 메세지를 전송하고 나서 칸을 비워준다.
//           }
//         }}
//       />
//     </>
//   );
// };
