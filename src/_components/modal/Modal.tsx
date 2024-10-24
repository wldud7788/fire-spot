import React from "react";

type ModalProps = {
  isOpen: boolean;
  modalClass: string;
  children: React.ReactNode;
  onClose: () => void;
};

const Modal = ({ modalClass, children, isOpen, onClose }: ModalProps) => {
  if (!isOpen) return null;
  return (
    <div className={`modal ${modalClass ? modalClass : ""}`}>
      <div className="modalInner">{children}</div>
      <button type="button" className="modalCloseBtn" onClick={onClose}>
        닫기
      </button>
    </div>
  );
};

export default Modal;
