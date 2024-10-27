import React from "react";

type ModalProps = {
  modalType?: string;
  wid: string;
  isOpen: boolean;
  children: React.ReactNode;
  onClose: () => void;
};

const Modal = ({ modalType, wid, children, isOpen, onClose }: ModalProps) => {
  if (!isOpen) return null;
  return (
    <div
      className={`modal fixed left-0 top-0 h-full w-full bg-[rgba(0,0,0,.35)] ${modalType ? modalType : ""} flex items-center justify-center`}
    >
      <div className={`modal_cont`} style={{ width: `${wid}px` }}>
        <div className="modal_inner">{children}</div>
        <button type="button" className="modal_close_btn" onClick={onClose}>
          닫기
        </button>
      </div>
    </div>
  );
};

export default Modal;
