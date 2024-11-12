"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import HeaderAuth from "./HeaderAuth";
import SearchBar from "../search/searchBar/SearchBar";
import { TAGS } from "@/_utils/common/constant";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showTags, setShowTags] = useState(false);

  // 스크롤 관련
  const handleScroll = () => {
    if (window.scrollY > 64) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
    // 태그 표시를 위한 스크롤 추가
    if (window.scrollY > 260) {
      setShowTags(true);
    } else {
      setShowTags(false);
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
          <nav className="hidden gap-5 text-lg font-semibold lg:flex">
            <Link href={"./guide"}>캠핑가이드</Link>
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
        {/* 태그 박스 */}
        <div
          className={`overflow-hidden transition-all duration-300 ${
            showTags ? "mt-4 h-[20px] pl-14 opacity-100" : "h-0 opacity-0"
          }`}
        >
          <div className="flex items-center gap-5 text-[#9A9696]">
            {TAGS.map((tag) => (
              <Link key={tag.name} href={tag.href}>
                {tag.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
