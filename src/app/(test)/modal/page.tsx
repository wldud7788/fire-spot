"use client";

import Modal from "@/_components/modal/Modal";
import ModalButton from "@/_components/modal/ModalButton";
import { useState } from "react";
import { buttonTypes } from "@/_components/modal/ModalButton";

const ModalTestPage = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleModalOpen = () => setIsOpen(true);
  const handleModalClose = () => setIsOpen(false);

  return (
    <div>
      <h1>모달 테스트</h1>
      <ModalButton
        buttonText={buttonTypes.open}
        onClick={handleModalOpen} // 버튼 클릭 시 모달 열기
      />

      <Modal
        modalType={""} // 모달 타입
        wid={"500"} // 컨텐츠 넓이
        isOpen={isOpen}
        onClose={handleModalClose}
      >
        <h2>모달 내용</h2>
        <p>모달 내의 텍스트입니다.</p>
        <button onClick={handleModalClose}>닫기</button>
      </Modal>
    </div>
  );
};

export default ModalTestPage;
