"use client";

type ModalButtonProps = {
  onClick: () => void;
  buttonText: string;
};

const ModalButton = ({ onClick, buttonText }: ModalButtonProps) => {
  return (
    <>
      <button type="button" className="modalBtn" onClick={onClick}>
        {buttonText}
      </button>
    </>
  );
};

export default ModalButton;
