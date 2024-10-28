"use client";

import React, { useEffect, useState } from "react";
import { Chat } from "@/type/chat";
import { createClient } from "@/_utils/supabase/client";
import browserClient from "@/_utils/supabase/client";
import { QueryClient, useQuery, useQueryClient } from "@tanstack/react-query";
import moment from "moment-timezone";

import { getChatData } from "./Chat-api";

import "@/css/chat.css";
// import useAuthStore from '@/store/useAuthStore';

const MainChat = () => {
  const supabase = createClient();
  const [messages, setMessages] = useState<Chat[]>([]);
  const [sendMessage, setSendMessage] = useState("");
  const queryClient = useQueryClient();

  //유저 정보 담기 위해
  const [userId, setUserId] = useState("");
  //   const { userName, userImg } = useAuthStore();

  //메세지 불러오기
  const getChatData = async () => {
    const { data: ChatData, error: ChatDataError } = await supabase
      .from("chat")
      .select("*");
    //   .order('created_at', { ascending: true }); //order를 통해 데이터 정렬
    if (ChatDataError) {
      console.error("Error loading fetchChatData:", ChatDataError.message);
    } else if (ChatData) {
      console.log("ChatData", ChatData);
      setMessages(ChatData);
    }
    return ChatData;
  };

  //유저정보 불러오기
  useEffect(() => {
    const getUserId = async () => {
      const { data: userSession, error: userSessionError } =
        await browserClient.auth.getSession();

      if (userSessionError) {
        console.log("userSessionError :>> ", userSessionError);
      } else {
        userSession.session && setUserId(userSession.session?.user.id);
      }
    };
    getUserId();

    getChatData();
    console.log("messagessssssss", messages);
  }, []);

  //작성한 메시지가 콘솔로 돌아옴....
  useEffect(() => {
    const channel = supabase
      .channel("chat")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "chat" },
        (payload) => {
          queryClient.invalidateQueries({
            queryKey: ["messageList"]
          });
          console.log("New message:", payload.new);
        }
      )
      .subscribe(); //위의 이벤트를 구독하겠다.
    //해당 컴포넌트가 화면상에 없을 때 아래의 함수 출력
    return () => {
      channel.unsubscribe();
    };
  }, []);

  //데이터 refetch를 위한 useQuery
  const { data: messageList } = useQuery({
    queryKey: ["messageList"],
    queryFn: getChatData
  });

  const sendMessageinRoom = async ({
    participant_uid,
    message
  }: //   room_id,
  {
    participant_uid: string;
    message: string;
    //   room_id: number,
  }) => {
    const { data, error } = await supabase
      .from("chat")
      .insert({ participant_uid, message }); //데이터 넣기, 나중에 에러 변수 수정
    console.log(data);

    if (error) {
      console.error("Error update comment : ", error.message);
    }
  };

  //현재 로그인중인 유저의 정보 가져오기
  //정보들이 일치하지 않으면 에러 발생

  const handleSendMessage = async () => {
    if (sendMessage === "") return;
    setSendMessage("");

    await sendMessageinRoom({
      participant_uid: userId,
      message: sendMessage
      //   room_id: roomId,
    });
  };

  //input에 value안 들어가도 값은 전송이 된다. 다만 value를 넣고 onChange를 할지 아래 것을 할지는 미지수
  return (
    <div className="chatBox">
      <div>
        {messages.map((message) => {
          return (
            <div className="chatBox2">
              <p>{message.participant_uid}</p>
              <p className="chating">{message.message}</p>
              <p>
                {moment
                  .utc(message.sendTime)
                  .tz("Asia/Seoul")
                  .format("a HH:mm")}
              </p>
            </div>
          );
        })}
      </div>

      <input
        className="border-light-blue-600 w-full border-2 p-3"
        type="text"
        placeholder="메시지를 입력하세요"
        value={sendMessage}
        onChange={(e) => setSendMessage(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            //엔터 누르면 메세지 전송되게
            e.preventDefault();
            handleSendMessage();
          }
        }}
      />
    </div>
  );
};

export default MainChat;
