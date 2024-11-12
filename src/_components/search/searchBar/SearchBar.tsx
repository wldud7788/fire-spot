"use client";
import React, { useRef } from "react";
import { useRouter } from "next/navigation";
import CSearchInput from "../CSearchInput";
import DropDownSearch from "../dropdown/DropDownSearch";
import DropdownRegions from "../dropdown/DropdownRegions";
import { useCamps } from "@/app/queries/useQueries";
import { variants } from "./style";
import { cn } from "@/_lib/utils";
import useDropdown from "@/_hooks/useDropdown";
import useDebounce from "@/_hooks/search/useDebounce";
import { useSearch } from "@/_hooks/search/useSearchRevalidate";
import { useRecentSearches } from "@/_hooks/search/useRecentSearches";

interface SearchBarProps {
  variant: "main" | "header" | "search";
  className?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ variant, className }) => {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const variantStyles = variants[variant];

  // 커스텀 훅 사용
  const {
    searchState,
    handleSearchChange,
    handleRegionSelect,
    validateSearchTerm
  } = useSearch();

  const { recentSearches, saveRecentSearch, deleteKeyword, deleteAllKeywords } =
    useRecentSearches();

  // 드롭다운 관리
  const { isDropdownOpen, toggleDropdown, closeDropdown, dropdownRef } =
    useDropdown(variant);

  // 디바운스 적용
  const debouncedSearchValue = useDebounce(searchState.validatedValue, 500);

  // API 호출
  const { data: results = [], isLoading } = useCamps(
    debouncedSearchValue,
    searchState.selectedRegion
  );

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleSearchChange(e.target.value);
  };

  const onSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const validation = validateSearchTerm(searchState.searchValue);
    if (isLoading || !validation.isValid) return;

    // 검색어 저장
    if (searchState.searchValue.trim()) {
      saveRecentSearch(searchState.searchValue);
    }

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
            recentSearches={recentSearches}
            onDeleteKeyword={deleteKeyword}
            onDeleteAll={deleteAllKeywords}
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
