"use client";

type ModalButtonProps = {
  onClick: () => void;
  buttonText: string;
};

const ModalButton = ({ onClick, buttonText }: ModalButtonProps) => {
  return (
    <>
      <button type="button" className="modal_btn" onClick={onClick}>
        {buttonText}
      </button>
    </>
  );
};

export default ModalButton;
