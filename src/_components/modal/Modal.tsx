import React from "react";

type ModalProps = {
  modalClass?: string;
  wid: string;
  isOpen: boolean;
  children: React.ReactNode;
  onClose: () => void;
};

const Modal = ({ modalClass, wid, children, isOpen, onClose }: ModalProps) => {
  if (!isOpen) return null;
  return (
    <div
      className={`modal ${modalClass ? modalClass : ""} w-full max-w-[${wid}]`}
    >
      <div className="modal_cont">
        <div className="modal_inner">{children}</div>
        <button type="button" className="modal_close_btn" onClick={onClose}>
          닫기
        </button>
      </div>
    </div>
  );
};

export default Modal;
