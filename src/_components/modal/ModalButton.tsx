"use client";

export const buttonTypes = {
  open: "open",
  gallery: "gallery"
} as const; // `as const`로 수정하여 값 타입 고정

export const buttonTypesKr = {
  open: "열기",
  gallery: "사진"
};

type ModalButtonType = keyof typeof buttonTypes; // `buttonTypes`의 키를 ModalButtonType 타입으로 설정

type ModalButtonProps = {
  onClick: () => void;
  buttonText: ModalButtonType;
};

const ModalButton = ({ onClick, buttonText }: ModalButtonProps) => {
  return (
    <>
      <button type="button" className="modal_btn" onClick={onClick}>
        {buttonTypesKr[buttonText]}
      </button>
    </>
  );
};

export default ModalButton;
