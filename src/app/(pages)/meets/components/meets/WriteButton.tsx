"use client";
import { useRouter } from "next/navigation";
import React, { ReactNode } from "react";

const WriteButton = ({ children }: { children: ReactNode }) => {
  const router = useRouter();

  const handleClick = () => {
    router.push("./meets/write");
  };
  return (
    <button onClick={handleClick} className="btn-add">
      {children}
    </button>
  );
};

export default WriteButton;
