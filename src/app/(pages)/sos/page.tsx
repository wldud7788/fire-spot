import React from "react";
import { createClient } from "@/_utils/supabase/client";
import MainChat from "@/_components/chat/MainChat";
import userList from "@/_components/chat/userList";

const SosList = () => {
  const supabase = createClient();

  //parans통해서 채팅방 생성
  const getRoomDetailes = async () => {
    const { data, error } = await supabase
      .from("chat_participants")
      .select("*");
  };

  return (
    <>
      <MainChat />
      {/* <userList/> */}
      <div>SosList</div>
    </>
  );
};

export default SosList;
