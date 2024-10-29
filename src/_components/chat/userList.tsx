import React, { useEffect, useState } from "react";
import { createClient } from "@/_utils/supabase/client";
import { Chat_rooms_info } from "@/type/chat";

const userList = () => {
  const supabase = createClient();
  //유저 정보 담기 위해
  const [userId, setUserId] = useState("");
  const [createRoom, setCreateRoom] = useState("");
  const [rooms, setRooms] = useState<Chat_rooms_info[]>([]);

  const getMyPrivateRoomInfos = async (userId: string) => {
    const { data, error } = await supabase
      .from("chat_participants")
      .select("room_id, participant_type, chat_rooms_info(room_type)")
      .eq("participant_uid", userId); //임의로 넣어둠

    if (error) {
      console.log("error", error.message);
      throw error;
    }

    // // 참가중인 방 중 '개인'방만 filtering
    // const filteredChatData = data.filter((item) => {
    //   return item.chat_rooms_info?.room_type === '개인';
    // });

    // return filteredChatData;
  };

  // if ( 로그인 유저id === chat_rooms_info의 OWNER_ID일 때 ) {
  //   채팅 버튼이 참가가 아닌 채팅창 보기로 활성화
  // }

  // 2) exited_room_id가 없으면 (1:1채팅방 아직 안열린 경우)
  // -> chat_rooms_info 테이블, chat_participants 테이블에 insert하기 -> room_id 반환
  // const new_room_id = await insertNewPrivateChatRoom({
  //   action_id: params.id,
  //   loggedInUserUid: user_uid,
  // });

  //채팅방 호출
  const getRoomsInfo = async () => {
    const { data, error } = await supabase.from("chat_rooms_info").select("*");
    if (error) {
      console.error("Error getRoomsInfo : ", error.message);
    } else if (data) {
      setRooms(data);
    }
  };

  useEffect(() => {
    getRoomsInfo();
  }, [rooms]);

  // 채팅방 개설 button Onclick으로 함수 호출 if
  const roomCreate = async () => {
    //해당 아이디와 관련한 채팅방이 존재하지 않을 때
    // if(id !=== id)
    {
      const { data, error } = await supabase.from("chat_rooms_info").insert("");
    }
  };
  return <div>userList</div>;
};

export default userList;
