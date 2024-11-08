"use client";
import React, { useState, useRef } from "react";
import CSearchInput from "../CSearchInput";
import DropDownSearch from "../dropdown/DropDownSearch";
import { useRouter } from "next/navigation";
import DropdownRegions from "../dropdown/DropdownRegions";
import { useCamps } from "@/app/queries/useQueries";
import { variants } from "./style";
import { cn } from "@/_lib/utils";
import useDropdown from "@/_hooks/useDropdown";

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
    useDropdown(variant);

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
          className={cn(
            "fixed inset-0 z-10 bg-black opacity-50",
            variant === "header" ? "z-30" : "z-20"
          )}
          onClick={(e) => {
            e.stopPropagation();
            closeDropdown();
          }}
        />
      )}
      <form
        className={cn(
          "relative z-20 flex w-full gap-1",
          variant === "header" ? "z-40" : "z-30"
        )}
        onSubmit={onSubmitHandler}
      >
        {variantStyles.showRegions && (
          <DropdownRegions onSelectRegion={handleRegionSelect} />
        )}
        <div className="header_search relative w-full">
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
