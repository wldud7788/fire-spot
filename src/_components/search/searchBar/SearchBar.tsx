"use client";
import React, { useState, useRef } from "react";
import CSearchInput from "../CSearchInput";
import useDropdown from "@/hooks/useDropdown";
import DropDownSearch from "../DropDownSearch";
import { useRouter } from "next/navigation";
import DropdownRegions from "../../dropdownRegions/DropdownRegions";
import { useCamps } from "@/app/queries/useQueries";
import { variants } from "./style";
import { cn } from "@/_lib/utils";

interface SearchBarProps {
  variant: "main" | "header" | "search";
  className?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ variant, className }) => {
  const router = useRouter();
  const [searchValue, setSearchValue] = useState("");
  const [selectedRegion, setSelectedRegion] = useState<string | undefined>(
    undefined
  );
  const variantStyles = variants[variant];
  const inputRef = useRef<HTMLInputElement>(null);

  const { data: results = [], isLoading } = useCamps(
    searchValue,
    selectedRegion
  );
  const { isDropdownOpen, toggleDropdown, closeDropdown, dropdownRef } =
    useDropdown();

  const handleRegionSelect = (region: string | null) => {
    setSelectedRegion(region ?? undefined);
  };

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const onSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isLoading) return;
    closeDropdown();
    router.push(
      `/search/?keyword=${encodeURIComponent(searchValue)}${
        selectedRegion ? `&region=${encodeURIComponent(selectedRegion)}` : ""
      }`
    );
  };

  const handleInputClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isDropdownOpen) {
      toggleDropdown();
    }
  };

  return (
    <div className="relative">
      {isDropdownOpen && (
        <div
          className="fixed inset-0 z-10 bg-black opacity-50"
          onClick={(e) => {
            e.stopPropagation();
            closeDropdown();
          }}
        />
      )}
      <form
        className="relative z-20 flex w-full gap-1"
        onSubmit={onSubmitHandler}
      >
        {variantStyles.showRegions && (
          <DropdownRegions onSelectRegion={handleRegionSelect} />
        )}
        <div className="header_search">
          <CSearchInput
            ref={inputRef}
            value={searchValue}
            onChange={onChangeHandler}
            placeholder="검색어를 입력해 주세요"
            onClick={handleInputClick}
            className={cn(
              variantStyles.input,
              variantStyles.container,
              className
            )}
          />
          <DropDownSearch
            isOpen={isDropdownOpen}
            closeDropdown={closeDropdown}
            dropdownRef={dropdownRef}
            results={results}
          />
        </div>
        {variantStyles.showButton && (
          <button type="submit" className={variantStyles.button}>
            검색
          </button>
        )}
      </form>
    </div>
  );
};

export default SearchBar;
