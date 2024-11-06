"use client";

import { createClient } from "@/_utils/supabase/client";

const supabase = createClient();

//단체 채팅방 생성
export const insertGroupChatRoom = async ({
  user_uid,
  action_id
}: {
  user_uid: string;
  action_id: string;
}) => {
  try {
    //채팅방 테이블에 insert
    const { data: room_id, error: insertRoomError } = await supabase
      .from("chat_rooms_info")
      .insert({
        owner_id: user_uid,
        action_id,
        room_type: "단체"
      })
      .select("id");

    if (insertRoomError) {
      console.error("Error insertRoomError : ", insertRoomError.message);
    }
    const roomId = room_id?.[0]?.id ?? null; //배열부분 나올 때마다 이해 안 됨 이제 이해됨.

    //참가자 테이블 insert - 참가자 본인과 방장
    const { error } = await supabase.from("chat_participants").insert([
      {
        room_id: roomId,
        participant_uid: user_uid,
        participant_type: "방장"
      }
    ]);
    if (error) {
      console.error("error insert", error.message);
      throw error;
    }
  } catch (error) {
    console.log("error", error);
    throw error;
  }
};

//단체방 room_id 가져오기
export const getChatRoomId = async (action_id: string) => {
  try {
    const { data: room_id, error } = await supabase
      .from("chat_rooms_info")
      .select("id")
      .eq("action_id", action_id)
      .eq("room_type", "단체");

    if (error) {
      console.error("Error getRoomId", error);
    }

    if (!room_id || room_id === null) {
      alert("room_id가 없습니다.");
    }

    const roomId = room_id?.[0]?.id ?? null;
    return roomId;
  } catch (error) {
    console.error("error >>", error);
    throw error;
  }
};

//로그인 유저가 참가자 테이블에 있는지 확인
export const checkUserExist = async ({
  room_id,
  user_uid
}: {
  room_id: string;
  user_uid: string;
}) => {
  try {
    const { data, error } = await supabase
      .from("chat_participants")
      .select("id")
      .eq("room_id", room_id)
      .eq("participant_uid", user_uid);

    if (error) {
      console.error("Error checkUserExist", error);
    }

    //데이터가 있으면 첫 번째 아이템의 id반환, 없으면 빈 값 반환
    return data && data?.length > 0 ? data[0].id : null;
  } catch (error) {
    console.error("error >>", error);
    throw error;
  }
};

//새롭게 참여하는 경우
export const insertNewParticipant = async ({
  room_id,
  user_uid
}: {
  room_id: string;
  user_uid: string;
}) => {
  try {
    const { error } = await supabase.from("chat_participants").insert({
      room_id,
      participant_uid: user_uid,
      participant_type: "참가자"
    }); //action_id가 뭔지 한참 생각해봤는데, 간단하게 내가 채팅방을 만드는 해당 게시글의 id였다.

    if (error) {
      console.error("Error insertNewParticipant : ", error.message);
    }

    //채팅방 생성, id반환
  } catch (error) {
    console.error("에러ㅓㅓㅓㅓㅓ", error);
    throw error;
  }
};
