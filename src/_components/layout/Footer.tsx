import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <footer className="w-screen leading-10">
      <ul className="flex h-[80px] items-center justify-center gap-5 bg-[#DCDCDC] text-sm text-[#707070]">
        <li>
          <Link href={"/"}>이용약관 </Link>
        </li>
        <span>|</span>
        <li>
          <Link href={"/"}>개인정보처리방침 </Link>
        </li>
        <span>|</span>
        <li>
          <Link href={"/"}>Copyright ⓒ 불멍스팟 All rights reserved</Link>
        </li>
      </ul>
    </footer>
  );
};

export default Footer;
