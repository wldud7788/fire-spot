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

const SosList = (params: string) => {
  const supabase = createClient();
  const [user, setUser] = useState<User | null>(null);

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
      action_id: params
    });

    const createPrivateRoom = await insertNewPrivateChatRoom({
      user_uid: user.id,
      action_id: params
    });

    if (exited_room_id) {
      privateRoomIdRef.current = exited_room_id;
      return; // 함수 종료
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
      <button className="border-2 border-indigo-600">채팅 참여하기</button>
      <MainChat />
      <div>SosList</div>
    </>
  );
};

export default SosList;
