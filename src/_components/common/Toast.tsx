"use client";
import { useEffect } from "react";

interface ToastProps {
  message: string;
  isVisible: boolean;
  onClose: () => void;
}

const Toast = ({ message, isVisible, onClose }: ToastProps) => {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  if (!isVisible) return null;

  return (
    <div className="bg-main fixed bottom-6 left-1/2 z-50 -translate-x-1/2 transform rounded-lg px-4 py-2 text-white shadow-lg">
      {message}
    </div>
  );
};

export default Toast;
