import React, { useEffect, useState } from "react";
import Modal from "@/_components/modal/Modal";
import { createClient } from "@/_utils/supabase/client";
import MainChat from "./MainChat";

type Props = {
  params: number;
};

const ModalChat = ({ params }: Props) => {
  const supabase = createClient();
  console.log("params", params);

  const [isOpen, setIsOpen] = useState(false);

  const handleModalOpen = () => setIsOpen(true);
  const handleModalClose = () => setIsOpen(false);

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
        <MainChat roomId={params} />
      </Modal>
    </div>
  );
};

export default ModalChat;
