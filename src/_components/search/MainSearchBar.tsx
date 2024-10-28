"use client";
import React, { useState } from "react";
import CSearchInput from "./CSearchInput";
import useDropdown from "@/hooks/useDropdown";
import DropdownRegions from "./Dropdown2";
import DropDownSearch from "./DropDownSearch";

const MainSearchBar = () => {
  const [searchValue, setSearchValue] = useState("");
  const { isDropdownOpen, toggleDropdown, closeDropdown, dropdownRef } =
    useDropdown(); // 훅 사용

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // 검색 로직 추가
  };
  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  return (
    <div className="relative">
      {/* 드롭다운 배경 부분 */}
      {isDropdownOpen && (
        <div
          className="fixed inset-0 z-10 bg-black opacity-50"
          onClick={closeDropdown}
        ></div>
      )}
      <form
        className="relative z-20 mt-10 flex h-[60px] w-full gap-1"
        onSubmit={handleSubmit}
      >
        {/* <DropDownRegions /> */}
        <DropdownRegions />
        <div className="header_search">
          <CSearchInput
            value={searchValue}
            onChange={onChangeHandler}
            placeholder="검색어를 입력해주세요"
            onClick={toggleDropdown}
            className="z-20 h-[60px] w-[250px] sm:w-[300px] md:w-[600px]"
          />
          <DropDownSearch
            isOpen={isDropdownOpen}
            closeDropdown={closeDropdown}
            dropdownRef={dropdownRef}
          />
        </div>
        <button
          type="button"
          className="h-[60px] w-[70px] rounded-2xl bg-blue-700 text-white"
        >
          검색
        </button>
      </form>
    </div>
  );
};

export default MainSearchBar;
