"use client";
import { useRouter } from "next/navigation";
import React, { ReactNode } from "react";

const WriteButton = ({
  children,
  url
}: {
  children: ReactNode;
  url: string;
}) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(url);
  };
  return (
    <button onClick={handleClick} className="btn-add">
      {children}
    </button>
  );
};

export default WriteButton;
