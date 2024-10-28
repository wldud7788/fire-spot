// Modal.tsx
import React from "react";

interface SearchModalProps {
  isOpen: boolean;
  closeModal: () => void;
  children: React.ReactNode;
}

const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  closeModal,
  children
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="rounded-lg bg-white p-5">
        <button onClick={closeModal} className="absolute right-2 top-2">
          X
        </button>
        {children}
      </div>
    </div>
  );
};

export default SearchModal;
