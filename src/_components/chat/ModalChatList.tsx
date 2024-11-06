import React, { useEffect, useState } from "react";
import Modal from "@/_components/modal/Modal";
import { createClient } from "@/_utils/supabase/client";
import { Chat_rooms_info, Chat } from "@/type/chat";
import ModalChat from "./ModalChat";

type Props = {
  params: string;
};

type newchatParticipants = {
  chat_rooms_info: {
    action_id: number;
    created_at: string;
    id: number;
    owner_id: string;
    recruit_number: null;
    room_type: string;
  };
  created_at: string;
  id: number;
  participant_type: string;
  participant_uid: string;
  room_id: number;
};

const ModalChatList = ({ params }: Props) => {
  const supabase = createClient();
  const [chatList, setChatList] = useState<newchatParticipants[]>([]);
  const [chatParticipants, setChatParticipants] = useState<
    newchatParticipants[]
  >([]);
  const [chatModalisOpen, setChatModalisOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleModalOpen = () => setIsOpen(true);
  const handleModalClose = () => setIsOpen(false);

  const toggleChat = chatModalisOpen;

  useEffect(() => {
    const getChatParticipants = async () => {
      const { data, error } = await supabase
        .from("chat_participants")
        .select("*, chat_rooms_info(*)")
        .eq("participant_uid", params);
      console.log(data);

      if (error) {
        console.error("Error loading ChatList", error.message);
        return;
      }
      if (!data) {
        return <div>loading</div>;
      }
      // 중복된 room_id를 제거

      const newData = data.filter((item, idx) => {
        return (
          data.findIndex((item2) => {
            return item.room_id === item2.room_id;
          }) === idx
        );
      });
      console.log("newData", newData);
      // const newData2 = { newData };
      setChatList(newData);
    };
    getChatParticipants();

    console.log("chatParticipants", chatParticipants);
    console.log("chatList", chatList);
  }, []);

  const handleChatOpen = () => {
    // setRoomId(room_id);
    // alert(room_id);
    return setChatModalisOpen(true);
  };
  return (
    <div>
      <h1>모달 테스트</h1>
      <button type="button" className="modal_btn" onClick={handleModalOpen}>
        모달 열기
      </button>

      <Modal
        modalType={""} // 모달 타입
        width={"800"} // 컨텐츠 넓이
        isOpen={isOpen}
        onClose={handleModalClose}
      >
        <h2>모달 내용</h2>
        <p>모달 내의 텍스트입니다.</p>
        <div>
          {chatList.map((chats) => {
            return (
              <div key={chats.id} className="border" onClick={handleChatOpen}>
                <p>{chats.chat_rooms_info.created_at}</p>
                <p>{chats.chat_rooms_info.room_type}</p>
                <p>{chats.chat_rooms_info.owner_id}</p>
                {toggleChat && <ModalChat params={chats.chat_rooms_info.id} />}
              </div>
            );
          })}
        </div>
      </Modal>
    </div>
  );
};

export default ModalChatList;
