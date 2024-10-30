"use client";

import Modal from "@/_components/modal/Modal";
import { useState } from "react";
const ModalTestPage = () => {
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
        width={"500"} // 컨텐츠 넓이
        isOpen={isOpen}
        onClose={handleModalClose}
      >
        <h2>모달 내용</h2>
        <p>모달 내의 텍스트입니다.</p>
      </Modal>
    </div>
  );
};

export default ModalTestPage;
