"use client";

import React, { useState, useEffect, useRef } from "react";
import { createClient } from "@/_utils/supabase/client";
import MainChat from "@/_components/chat/MainChat";
import {
  checkPrivateChatRoomExist,
  insertNewPrivateChatRoom,
  sendMessage
} from "@/_components/chat/PrivateChat";
import {
  insertNewParticipant,
  checkUserExist,
  getChatRoomId,
  insertGroupChatRoom
} from "@/_components/chat/GroupChat_fun";
import {
  getRecruitingNumber,
  countParticipants,
  changeRecruitingState
} from "@/_components/chat/GroupChat";
import { User } from "@supabase/supabase-js";
import { getUser } from "@/_utils/auth";

const SosList = (params: string) => {
  const supabase = createClient();
  const [user, setUser] = useState<User | null>(null);

  const action_id = "28";

  // 1:1 채팅방 room_id 담는 Ref
  const privateRoomIdRef = useRef("");

  // 단체 채팅방 room_id 담는 Ref
  const groupRoomIdRef = useRef("");

  useEffect(() => {
    const fetchUser = async () => {
      const currentUser = await getUser();
      setUser(currentUser);
      console.log("currentUser", currentUser);
    };
    fetchUser();
  }, []);

  //parans통해서 채팅방 생성
  const getRoomDetailes = async () => {
    const { data, error } = await supabase
      .from("chat_participants")
      .select("*");
  };

  const PrivateInsert = async () => {
    if (!user) {
      alert("로그인이 필요합니다");
      return;
    }

    const exited_room_id = await checkPrivateChatRoomExist({
      user_uid: user.id,
      action_id: "28"
    });
    // 1) exited_room_id가 있으면 (1:1채팅방 이미 열려있는 경우) -> 모달에 전달
    // privateRoomIdRef에 room_id 설정 -> 1:1채팅 모달 props로 넘겨주기
    if (exited_room_id) {
      privateRoomIdRef.current = exited_room_id;
      alert("채팅방에 참여돼있습니다");
      return; // 함수 종료
    }
    const createPrivateRoom = await insertNewPrivateChatRoom({
      user_uid: user.id,
      action_id: "28"
    });

    // 2) exited_room_id가 없으면 (1:1채팅방 아직 안열린 경우)
    // -> chat_rooms_info 테이블, chat_participants 테이블에 insert하기 -> room_id 반환

    // privateRoomIdRef에 room_id 설정
    if (createPrivateRoom) {
      privateRoomIdRef.current = createPrivateRoom;
      alert("채팅방에 참가합니다.");
    }
  };

  //단체 생성 or 들어가기
  const GroupInsert = async () => {
    if (!user) {
      alert("로그인이 필요합니다");
      return;
    }

    //게시글 작성할 때 호출
    // await insertGroupChatRoom({
    //   user_uid: user.id,
    //   action_id: "28"
    // });

    // 단체 채팅방 room_id 가져오기
    const room_id = await getChatRoomId("28");
    groupRoomIdRef.current = room_id;

    // 채팅에 참여중인지 여부 확인(참여중이면 id값 있음 / 미참여 상태이면 null)
    const participant_id = await checkUserExist({
      room_id: "38",
      user_uid: user.id
    });

    if (participant_id) {
      alert("채팅방에 참여돼있습니다");
      return; // 함수 종료
    }

    const isConfirm = window.confirm("green-action에 참여하시겠습니까?");

    if (isConfirm) {
      const participantsNumber = await countParticipants(room_id);
      const recruitingNumber = await getRecruitingNumber(room_id);

      if (participantsNumber === recruitingNumber) {
        alert("모집마감 되었습니다");
        return;
      }

      if (participantsNumber < recruitingNumber) {
        await insertNewParticipant({ room_id, user_uid: user.id });
      }

      if (participantsNumber + 1 === recruitingNumber) {
        await changeRecruitingState({ action_id, mode: "in" });
      }
    }
  };

  return (
    <>
      <button
        className="mr-3 border-2 border-indigo-600"
        onClick={PrivateInsert}
      >
        1:1 문의하기
      </button>
      <button className="border-2 border-indigo-600" onClick={GroupInsert}>
        채팅 참여하기
      </button>
      <MainChat />
      <div>SosList</div>
    </>
  );
};

export default SosList;
