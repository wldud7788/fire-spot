import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <footer className="w-full">
      <ul className="flex flex-col items-center justify-center gap-2 bg-gray-200 py-3 text-sm text-gray-500 md:flex-row md:gap-5 md:py-4">
        <div className="flex items-center gap-3">
          <li>
            <Link href="/">이용약관</Link>
          </li>
          <span>|</span>
          <li>
            <Link href="/">개인정보처리방침</Link>
          </li>
        </div>
        <span className="hidden md:block">|</span>
        <li>
          <Link href="/">Copyright ⓒ 불멍스팟 All rights reserved</Link>
        </li>
      </ul>
    </footer>
  );
};

export default Footer;
