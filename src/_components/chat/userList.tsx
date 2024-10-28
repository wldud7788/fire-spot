import React, { useEffect, useState } from "react";
import { createClient } from "@/_utils/supabase/client";

const userList = () => {
  const supabase = createClient();
  //유저 정보 담기 위해
  const [userId, setUserId] = useState("");

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

  return <div>userList</div>;
};

export default userList;
