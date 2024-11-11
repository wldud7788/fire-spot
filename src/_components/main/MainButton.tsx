import Link from "next/link";
import React from "react";

interface MainButtonProps {
  text?: string;
  href: string;
  background?: string;
  onClick?: () => void;
}

const MainButton = ({ text, href, background, onClick }: MainButtonProps) => {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={`bg-${background} flex h-[60px] flex-1 items-center justify-center rounded-[10px] text-[24px] font-semibold text-[#fff]`}
    >
      {text}
    </Link>
  );
};

export default MainButton;
