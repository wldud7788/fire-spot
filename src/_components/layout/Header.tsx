"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import HeaderAuth from "./HeaderAuth";
import useDropdown from "@/hooks/useDropdown";
import CSearchInput from "../search/CSearchInput";

const Header = () => {
  const [searchValue, setSearchValue] = useState("");
  const { isDropdownOpen, toggleDropdown, closeDropdown, dropdownRef } =
    useDropdown(); // 훅 사용

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  // 스크롤 관련
  const [isScrolled, setIsScrolled] = useState(false);
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
      className={`fixed left-0 right-0 top-0 z-10 bg-white ${isScrolled ? "shadow-md" : "shadow-none"}`}
    >
      <div className="relative mx-auto max-w-[1540px] bg-white p-5">
        {/* 드롭다운 배경 부분 */}
        {isDropdownOpen && (
          <div
            className="fixed inset-0 z-10 bg-black opacity-50"
            onClick={closeDropdown}
          ></div>
        )}
        {/* 로고 + 검색 영역 */}
        <div className="z-10 flex items-center justify-between leading-40">
          <div className="flex gap-8">
            <Link href={"/"}>로고</Link>
            <form action="" className="relative z-20 flex items-center">
              <div className="header_search">
                <CSearchInput
                  value={searchValue}
                  onChange={onChangeHandler}
                  placeholder="검색어를 입력해 주세요"
                  onClick={toggleDropdown} // 클릭 시 드롭다운 열기
                  className="z-20 h-[40px] w-[250px] sm:w-[300px] md:w-[400px]"
                />
              </div>
              <DropDownSearch
                isOpen={isDropdownOpen}
                closeDropdown={closeDropdown}
                dropdownRef={dropdownRef}
              />
            </form>
          </div>
          {/* 메뉴 Nav */}
          <nav className="hidden gap-5 lg:flex">
            <Link href={"/"}>캠핑 가이드</Link>
            <Link href={"/"}>캠핑장</Link>
            <Link href={"/"}>캠핑크루</Link>
            <Link href={"/"}>후기</Link>
          </nav>
          {/* 아이콘 */}
          <div className="flex items-center">
            <Link href={"/"} className="header_icon bg-map"></Link>
            <Link href={"/"} className="header_icon bg-chat"></Link>
            <Link href={"/"} className="header_icon bg-sos"></Link>
            <HeaderAuth />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

const DropDownSearch: React.FC<{
  isOpen: boolean;
  closeDropdown: () => void;
  dropdownRef: React.RefObject<HTMLDivElement>;
}> = ({ isOpen, closeDropdown, dropdownRef }) => {
  if (!isOpen) return null;

  return (
    <div
      ref={dropdownRef}
      className="absolute top-0 w-full rounded-2xl border border-slate-300 bg-white p-[25px] pt-[50px] shadow-md"
    >
      {/* 드롭다운 내용 */}
      <ul className="max-h-60 overflow-y-auto">
        <Link href="/" onClick={closeDropdown}>
          <li className="cursor-pointer p-2 hover:bg-gray-100">옵션 1</li>
        </Link>
        <Link href="/" onClick={closeDropdown}>
          <li className="cursor-pointer p-2 hover:bg-gray-100">옵션 2</li>
        </Link>
        <Link href="/" onClick={closeDropdown}>
          <li className="cursor-pointer p-2 hover:bg-gray-100">옵션 3</li>
        </Link>
      </ul>
    </div>
  );
};
