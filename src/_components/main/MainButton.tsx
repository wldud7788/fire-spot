import Link from "next/link";
import React from "react";

interface MainButtonProps {
  text: string;
}

const MainButton = ({ text }: MainButtonProps) => {
  return (
    <Link
      href={"#"}
      className="flex h-[60px] flex-1 items-center justify-center rounded-[15px] bg-[#f2f2f2] text-[20px] font-extrabold text-[#404040]"
    >
      {text}
    </Link>
  );
};

export default MainButton;
