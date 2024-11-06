"use client";

import { createClient } from "@/_utils/supabase/client";

const supabase = createClient();

//1대일 이미 존재하는지 확인
export const checkPrivateChatRoomExist = async ({
  user_uid,
  action_id
}: {
  user_uid: string;
  action_id: string;
}) => {
  try {
    //참가자 테이블 접근, 로그인유저 아이디로 참여중인 방의 room_id받기
    const { data: roomList, error: roomListError } = await supabase
      .from("chat_participants")
      .select("room_id")
      .eq("participant_uid", user_uid);

    if (roomListError) {
      console.error("Error getRoomList : ", roomListError.message);
    }

    //roomList에서 id 추출
    const roomIds = roomList?.map((room) => room.room_id) || [];

    //채팅방 테이블 접근 -> id 일치하는 것 선택
    const { data: room_id, error: roomIdError } = await supabase
      .from("chat_rooms_info")
      .select("id")
      .in("id", roomIds) //roomlist에서 가져온 room_id에서 포함되는 것만 선택
      .eq("room_type", "개인") //개인인 1대일 채팅방만 추출
      .eq("action_id", action_id);

    if (roomIdError) {
      console.error("Error getRoomId : ", roomIdError.message);
    }
    //이부분이 잘 이해가 안 됨. room_id는 어디있는데?
    if (room_id && room_id.length > 0) {
      return room_id[0].id; // room_id 값이 있으면 해당 값 반환 - 이미 1:1 방이 있는 경우
    } else {
      return null; // 값이 없으면 null 반환 - 아직 1:1방이 열리지 않은 경우
    }
  } catch (error) {
    console.error("error >>", error);
    throw error;
  }
};

//1대일 없을 때 insert
export const insertNewPrivateChatRoom = async ({
  action_id,
  user_uid
}: {
  action_id: string;
  user_uid: string;
}) => {
  // 1) 채팅방 테이블에 insert
  // 2) action_id로 owner_id 파악하여 함께 insert
  // 3) room_id 반환

  //owner_id가져오기
  try {
    const { data: ownerId, error: ownerIdError } = await supabase
      .from("meet")
      .select("user_id")
      .eq("id", action_id); //action_id가 뭔지 한참 생각해봤는데, 간단하게 내가 채팅방을 만드는 해당 게시글의 id였다.
    if (ownerIdError) {
      console.error("Error getOwnerId : ", ownerIdError.message);
    }

    const actionOwnerId = ownerId?.[0]?.user_id ?? null; //배열부분 나올 때마다 이해 안 됨

    //채팅방 생성, id반환
    if (actionOwnerId !== null) {
      const { data: roomId, error: insertRoomError } = await supabase
        .from("chat_rooms_info")
        .insert({
          owner_id: actionOwnerId,
          action_id,
          room_type: "개인"
        })
        .select("id");

      if (insertRoomError) {
        console.error("Error insertRoomError : ", insertRoomError.message);
      }
      const privateChatRoom_id = roomId?.[0]?.id ?? null; //배열부분 나올 때마다 이해 안 됨

      //참가자 테이블 insert - 참가자 본인과 방장
      const { error: insertParticipantError } = await supabase
        .from("chat_participants")
        .insert([
          {
            room_id: privateChatRoom_id,
            participant_uid: user_uid,
            participant_type: "참가자"
          },
          {
            room_id: privateChatRoom_id,
            participant_uid: actionOwnerId,
            participant_type: "방장"
          }
        ]);

      if (insertParticipantError) {
        console.error(
          "Error insertParticipantError : ",
          insertParticipantError.message
        );
      }

      return privateChatRoom_id;
    }
  } catch (error) {
    console.error("에러ㅓㅓㅓㅓㅓ", error);
    throw error;
  }
};

//메세지 보내기 ?
export const sendMessage = async ({
  sender_uid,
  room_id,
  content
}: {
  sender_uid: string;
  room_id: string;
  content: string;
}) => {
  const { error } = await supabase.from("chat_messages").insert({
    sender_uid,
    room_id,
    content
  });

  if (error) {
    console.log("error", error.message);
  }
};
