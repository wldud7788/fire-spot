"use client";
import React, { useState, useRef, useEffect } from "react";
import CSearchInput from "../CSearchInput";
import DropDownSearch from "../dropdown/DropDownSearch";
import { useRouter } from "next/navigation";
import DropdownRegions from "../dropdown/DropdownRegions";
import { useCamps } from "@/app/queries/useQueries";
import { variants } from "./style";
import { cn } from "@/_lib/utils";
import useDropdown from "@/_hooks/useDropdown";
import useDebounce from "@/_hooks/useDebounce";
import { MIN_SEARCH_LENGTH, SPECIAL_CHARS } from "@/_utils/common/constant";

interface SearchBarProps {
  variant: "main" | "header" | "search";
  className?: string;
}
interface ValidationResult {
  isValid: boolean;
  error: string | null;
}

// 유효성 검사 함수
const validateSearchTerm = (value: string): ValidationResult => {
  if (SPECIAL_CHARS.test(value)) {
    return { isValid: false, error: "특수문자는 사용할 수 없습니다." };
  }
  if (!value.trim()) {
    return { isValid: false, error: "검색어를 입력해주세요." };
  }
  if (value.length < MIN_SEARCH_LENGTH) {
    return {
      isValid: false,
      error: `검색어는 ${MIN_SEARCH_LENGTH}자 이상 입력해주세요.`
    };
  }
  return { isValid: true, error: null };
};
const SearchBar: React.FC<SearchBarProps> = ({ variant, className }) => {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const variantStyles = variants[variant];

  // 상태 관리
  const [searchState, setSearchState] = useState({
    searchValue: "",
    validatedValue: "",
    validationError: null as string | null,
    selectedRegion: undefined as string | undefined
  });

  // 디바운스 적용
  const debouncedSearchValue = useDebounce(searchState.validatedValue, 500);

  // API 호출
  const { data: results = [], isLoading } = useCamps(
    debouncedSearchValue,
    searchState.selectedRegion
  );

  // 드롭다운 관리
  const { isDropdownOpen, toggleDropdown, closeDropdown, dropdownRef } =
    useDropdown(variant);

  const handleRegionSelect = (region: string | null) => {
    setSearchState((prev) => ({
      ...prev,
      selectedRegion: region ?? undefined
    }));
  };

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const validation = validateSearchTerm(value);

    setSearchState((prev) => ({
      ...prev,
      searchValue: value,
      validationError: validation.error,
      validatedValue: validation.isValid ? value : prev.validatedValue
    }));
  };

  const onSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validation = validateSearchTerm(searchState.searchValue);
    if (isLoading || !validation.isValid) return;

    closeDropdown();
    const searchParams = new URLSearchParams({
      keyword: searchState.searchValue
    });

    if (searchState.selectedRegion) {
      searchParams.append("region", searchState.selectedRegion);
    }

    router.push(`/search/?${searchParams.toString()}`);
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
            value={searchState.searchValue}
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
            isLoading={isLoading}
            validationError={searchState.validationError}
            validatedValue={searchState.validatedValue}
          />
        </div>
        {variantStyles.showButton && (
          <button
            type="submit"
            className={cn(
              variantStyles.button,
              (isLoading || !!searchState.validationError) &&
                "cursor-not-allowed opacity-50"
            )}
            disabled={isLoading || !!searchState.validationError}
          >
            검색
          </button>
        )}
      </form>
    </div>
  );
};

export default SearchBar;
