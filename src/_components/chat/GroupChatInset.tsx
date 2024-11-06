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

type Props = {
  params: {
    id: string;
  };
};

const GroupChatingInsert = ({ params }: Props) => {
  console.log("params", params.id);

  const supabase = createClient();
  const [user, setUser] = useState<User | null>(null);

  const action_id = "28";

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

  //단체 생성 or 들어가기
  const GroupInsert = async () => {
    if (!user) {
      alert("로그인이 필요합니다");
      return;
    }

    // 게시글 작성할 때 호출
    await insertGroupChatRoom({
      user_uid: user.id,
      action_id: params.id
    });

    // 단체 채팅방 room_id 가져오기
    const room_id = await getChatRoomId(params.id);
    groupRoomIdRef.current = room_id;

    // 채팅에 참여중인지 여부 확인(참여중이면 id값 있음 / 미참여 상태이면 null)
    const participant_id = await checkUserExist({
      room_id: params.id,
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
      <button className="border-2 border-indigo-600" onClick={GroupInsert}>
        채팅 참여하기
      </button>
      <div>SosList</div>
      {/* <MainChat roomId={} /> */}
    </>
  );
};

export default GroupChatingInsert;
