"use client";

import React, { useState, useEffect, useRef } from "react";
import { createClient } from "@/_utils/supabase/client";
import MainChat from "@/_components/chat/MainChat";
import {
  checkPrivateChatRoomExist,
  insertNewPrivateChatRoom,
  sendMessage
} from "@/_components/chat/PrivateChat";
import { User } from "@supabase/supabase-js";
import { getUser } from "@/_utils/auth";

type Props = {
  params: {
    id: string;
  };
};

const PrivateChatingInsert = ({ params }: Props) => {
  console.log("params", params.id);

  const supabase = createClient();
  const [user, setUser] = useState<User | null>(null);

  // 1:1 채팅방 room_id 담는 Ref
  const privateRoomIdRef = useRef("");

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
      action_id: params.id
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
      action_id: params.id
    });

    // 2) exited_room_id가 없으면 (1:1채팅방 아직 안열린 경우)
    // -> chat_rooms_info 테이블, chat_participants 테이블에 insert하기 -> room_id 반환

    // privateRoomIdRef에 room_id 설정
    if (createPrivateRoom) {
      privateRoomIdRef.current = createPrivateRoom;
      alert("채팅방에 참가합니다.");
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
      {/* <MainChat roomId={privateRoomIdRef} /> */}
    </>
  );
};

export default PrivateChatingInsert;
