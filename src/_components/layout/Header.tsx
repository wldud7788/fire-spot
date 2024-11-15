"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import HeaderAuth from "./HeaderAuth";
import SearchBar from "../search/searchBar/SearchBar";
import { TAGS } from "@/_utils/common/constant";
import { SERVER_PAGE_URL } from "@/_utils/common/constant";
import { Menu, X } from "lucide-react";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showTags, setShowTags] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showSearch, setSearch] = useState(true);

  const handleScroll = () => {
    if (window.scrollY > 64) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
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
      className={`fixed left-0 right-0 top-0 z-50 bg-white ${
        isScrolled ? "shadow-md" : "shadow-none"
      }`}
    >
      <div className="relative mx-auto max-w-[1540px] bg-white p-3 md:p-5">
        {/* 메인 헤더 */}
        <div className="z-10 flex items-center justify-between leading-40">
          {/* 로고 + 검색 영역 */}
          <div className="flex items-center gap-2 md:gap-8">
            <Link
              href={"/"}
              className="h-[32px] w-[150px] bg-logo bg-contain bg-no-repeat md:h-[40px] md:w-[230px]"
            >
              <p className="sr-only">로고</p>
            </Link>
            {/* 데스크탑 검색바  */}
            <div className="block max-600:hidden">
              <SearchBar variant="header" />
            </div>
          </div>

          {/* 데스크톱 메뉴 Nav */}
          <nav className="hidden gap-5 text-lg font-semibold lg:flex">
            <Link href={"/beginner"}>캠핑가이드</Link>
            <Link href={"/camps"}>캠핑장</Link>
            <Link href={SERVER_PAGE_URL.meets}>커뮤니티</Link>
          </nav>

          {/* 아이콘 영역 */}
          <div className="flex items-center gap-2">
            <div className="hidden md:flex">
              <Link href={"/search"} className="header_icon bg-map"></Link>
              <Link
                href={`${SERVER_PAGE_URL.chat}`}
                className="header_icon bg-chat"
              ></Link>
              <Link href={"/sos"} className="header_icon bg-sos"></Link>
            </div>
            <HeaderAuth />
            {/* 모바일 메뉴 버튼 */}
            <button
              className="ml-2 lg:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* 모바일 검색바 */}
        <div className="mt-2 hidden max-600:block">
          <SearchBar variant="header" />
        </div>

        {/* 모바일 메뉴 */}
        {isMenuOpen && (
          <nav className="absolute left-0 right-0 top-full z-50 bg-white px-5 py-4 shadow-md lg:hidden">
            <div className="flex flex-col gap-4">
              <Link
                href={"/beginner"}
                className="text-lg font-semibold"
                onClick={() => setIsMenuOpen(false)}
              >
                캠핑가이드
              </Link>
              <Link
                href={"/camps"}
                className="text-lg font-semibold"
                onClick={() => setIsMenuOpen(false)}
              >
                캠핑장
              </Link>
              <Link
                href={SERVER_PAGE_URL.meets}
                className="text-lg font-semibold"
                onClick={() => setIsMenuOpen(false)}
              >
                커뮤니티
              </Link>
            </div>
          </nav>
        )}

        {/* 태그 박스 */}
        <div
          className={`overflow-hidden transition-all duration-300 ${
            showTags ? "mt-4 h-[20px] opacity-100" : "h-0 opacity-0"
          }`}
        >
          <div className="flex items-center gap-5 pl-[270px] text-[#9A9696]">
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
