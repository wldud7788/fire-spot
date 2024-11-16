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
  const handleBackgroundClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };
  return (
    <div
      className={`modal fixed left-0 top-0 z-[9999] h-full w-full bg-[rgba(0,0,0,.35)] ${className ? className : ""} flex items-center justify-center px-[15px]`}
      onClick={handleBackgroundClick}
    >
      <div
        className={`modal_cont 모달지영추가`}
        style={{ width: `${width}px` }}
      >
        <div className="modal_inner">{children}</div>
        <button
          type="button"
          className="modal_close_btn absolute right-[15px] top-[15px]"
          onClick={onClose}
        >
          <img
            src="/assets/images/common/ico-modal-close.svg"
            alt="모달 닫기"
          />
        </button>
      </div>
    </div>
  );
};

export default Modal;
