"use client";
import { useRouter } from "next/navigation";
import React, { ReactNode } from "react";

const WriteButton = ({ children }: { children: ReactNode }) => {
  const router = useRouter();

  const handleClick = () => {
    router.push("./meets/write");
  };
  return <div onClick={handleClick}>{children}</div>;
};

export default WriteButton;
