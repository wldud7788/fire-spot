"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import HeaderAuth from "./HeaderAuth";
import SearchBar from "../search/searchBar/SearchBar";
import { TAGS } from "@/_utils/common/constant";
import { SERVER_PAGE_URL } from "@/_utils/common/constant";
import { Menu, X } from "lucide-react";
import useDropdown from "@/_hooks/useDropdown";
import { signOut } from "@/_utils/auth";
import { useRouter } from "next/navigation";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showTags, setShowTags] = useState(false);
  // 모바일 메뉴의 드롭다운 관리
  const { isDropdownOpen, toggleDropdown, closeDropdown, dropdownRef } =
    useDropdown("mobile");
  const [showCommunitySubmenu, setShowCommunitySubmenu] = useState(false);
  const router = useRouter();
  const handleLogout = async () => {
    await signOut();
    closeDropdown();
    router.push("/sign-in");
  };

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
      className={`fixed left-0 right-0 top-0 z-[110] bg-white ${
        isScrolled ? "shadow-md" : "shadow-none"
      }`}
    >
      <div className="relative mx-auto max-w-[1540px] bg-white p-3 md:p-5">
        {/* 메인 헤더 */}
        <div className="z-10 flex items-center justify-between gap-9 leading-40">
          {/* 로고 + 검색 영역 */}
          <div className="flex w-[530px] items-center gap-[50px]">
            <Link href={"/"} className="w-[150px]">
              <img
                src="/assets/images/logo.svg"
                alt="logo"
                className="w-[150px]"
              />
              <p className="sr-only">로고</p>
            </Link>
            {/* 데스크탑 검색바  */}
            <div className="block w-full max-w-[473px] max-600:hidden">
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
            <button className="ml-2 lg:hidden" onClick={toggleDropdown}>
              {isDropdownOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* 모바일 검색바 */}
        <div className="mt-2 hidden max-600:block">
          <SearchBar variant="header" />
        </div>

        {/* 모바일 메뉴 */}
        {isDropdownOpen && (
          <nav className="absolute left-0 right-0 top-full z-50 bg-white px-5 shadow-md lg:hidden">
            <ul className="flex flex-col items-center py-6">
              <li className="w-full border-b py-4 text-center">
                <Link
                  href={"/beginner"}
                  className="hover:text-main text-[17px] font-medium text-gray-800 transition-colors"
                  onClick={closeDropdown}
                >
                  캠핑가이드
                </Link>
              </li>
              <li className="w-full border-b py-4 text-center">
                <Link
                  href={"/camps"}
                  className="hover:text-main text-[17px] font-medium text-gray-800 transition-colors"
                  onClick={closeDropdown}
                >
                  캠핑장
                </Link>
              </li>
              {/* 커뮤니티 메뉴 */}
              <li className="w-full border-b py-4 text-center">
                <button
                  onClick={() => setShowCommunitySubmenu(!showCommunitySubmenu)}
                  className="relative mx-auto inline-flex items-center justify-center text-[17px] font-medium text-gray-800"
                >
                  커뮤니티
                  <img
                    src="/assets/images/common/arrow-down.svg"
                    className={`absolute right-[-28px] top-1/2 h-5 w-5 -translate-y-1/2 transition-transform ${
                      showCommunitySubmenu ? "rotate-180" : ""
                    }`}
                    alt="드롭다운 버튼"
                  />
                </button>
                {showCommunitySubmenu && (
                  <div className="mt-4 space-y-3">
                    <Link
                      href={"/sos"}
                      className="block text-center text-[15px] font-medium text-gray-600"
                      onClick={closeDropdown}
                    >
                      SOS
                    </Link>
                    <Link
                      href={SERVER_PAGE_URL.meets}
                      className="block text-center text-[15px] font-medium text-gray-600"
                      onClick={closeDropdown}
                    >
                      캠핑모임
                    </Link>
                  </div>
                )}
              </li>
              <li className="w-full border-b py-4 text-center">
                <Link
                  href={"/mypage"}
                  className="hover:text-main text-[17px] font-medium text-gray-800 transition-colors"
                  onClick={closeDropdown}
                >
                  마이페이지
                </Link>
              </li>
              <li className="w-full py-4 text-center">
                <button
                  className="hover:text-main text-[17px] font-medium text-gray-800 transition-colors"
                  onClick={handleLogout}
                >
                  로그아웃
                </button>
              </li>
            </ul>
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
