import React from "react";

type ModalProps = {
  modalType?: string; // modalType의 경우 이후 컨펌이나 다른 타입이 추가될 때 다르게 ui 보여줄 수 있도록 적용 예정
  className?: string;
  width: string;
  isOpen: boolean;
  children: React.ReactNode;
  onClose: () => void;
};

const Modal = ({
  modalType,
  className,
  width,
  children,
  isOpen,
  onClose
}: ModalProps) => {
  if (!isOpen) return null;
  return (
    <div
      className={`modal fixed left-0 top-0 h-full w-full bg-[rgba(0,0,0,.35)] ${className ? className : ""} flex items-center justify-center`}
    >
      <div className={`modal_cont`} style={{ width: `${width}px` }}>
        <div className="modal_inner">{children}</div>
        <button type="button" className="modal_close_btn" onClick={onClose}>
          닫기
        </button>
      </div>
    </div>
  );
};

export default Modal;
