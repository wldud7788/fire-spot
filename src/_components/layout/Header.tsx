"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import HeaderAuth from "./HeaderAuth";
import SearchBar from "../search/searchBar/SearchBar";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  // 스크롤 관련
  const handleScroll = () => {
    if (window.scrollY > 64) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={`fixed left-0 right-0 top-0 z-40 bg-white ${isScrolled ? "shadow-md" : "shadow-none"}`}
    >
      <div className="relative mx-auto max-w-[1540px] bg-white p-5">
        {/* 로고 + 검색 영역 */}
        <div className="z-10 flex items-center justify-between leading-40">
          <div className="flex gap-8">
            <Link href={"/"}>로고</Link>
            <SearchBar variant="header" />
            {/* 헤더 검색 (버튼 없음, DropdownRegions 없음, 높이 40px) */}
          </div>
          {/* 메뉴 Nav */}
          <nav className="hidden gap-5 lg:flex">
            <Link href={"./guide"}>캠핑 가이드</Link>
            <Link href={"./camps"}>캠핑장</Link>
            <Link href={"./meets"}>커뮤니티</Link>
            <Link href={"./"}>후기</Link>
          </nav>
          {/* 아이콘 */}
          <div className="flex items-center">
            <Link href={"/search"} className="header_icon bg-map"></Link>
            <Link href={"/chat"} className="header_icon bg-chat"></Link>
            <Link href={"/sos"} className="header_icon bg-sos"></Link>
            <HeaderAuth />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
