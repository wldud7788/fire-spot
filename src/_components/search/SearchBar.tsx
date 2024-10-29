"use client";
import React, { useEffect, useState } from "react";
import CSearchInput from "./CSearchInput";
import useDropdown from "@/hooks/useDropdown";
import DropDownSearch from "./DropDownSearch";
import { getSearchCampsData } from "@/_utils/serverActions/campApi";
import { Camp } from "@/app/(pages)/camps/types/Camp";
import { useRouter } from "next/navigation";
import DropdownRegions from "../dropdownRegions/DropdownRegions";

interface SearchBarProps {
  showButton: boolean;
  showDropdownRegions: boolean;
  height?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({
  showButton,
  showDropdownRegions,
  height = "60px"
}) => {
  const router = useRouter();
  const [searchValue, setSearchValue] = useState("");
  const [results, setResults] = useState<Camp[]>([]); // 초기 상태를 빈 배열로 설정
  const [filteredResults, setFilteredResults] = useState<Camp[]>([]);
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null); // 지역

  // 드롭다운
  const { isDropdownOpen, toggleDropdown, closeDropdown, dropdownRef } =
    useDropdown();

  useEffect(() => {
    const loadData = async () => {
      if (searchValue) {
        try {
          const data = await getSearchCampsData(searchValue);
          setResults(data || []); // API 응답이 없을 경우 빈 배열로 설정
        } catch (error) {
          console.error("Error fetching data:", error);
          setResults([]); // 에러 발생 시 빈 배열로 설정
        }
      } else {
        setResults([]); // 검색어가 없으면 결과 초기화
      }
    };

    loadData();
  }, [searchValue]);

  useEffect(() => {
    // 선택된 지역에 따라 결과 필터링
    if (selectedRegion) {
      if (selectedRegion === "전국") {
        setFilteredResults(results); // 전국 선택 시 모든 결과 표시
      } else {
        const filtered = results.filter((camp) => camp.doNm === selectedRegion); // camp.region이 선택된 지역과 일치하는 캠프만 필터링
        setFilteredResults(filtered);
      }
    } else {
      setFilteredResults(results); // 지역이 선택되지 않은 경우 전체 결과 표시
    }
  }, [selectedRegion, results]);

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const onSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push(
      `search/?keyword=${encodeURIComponent(searchValue)}${selectedRegion ? `&region=${encodeURIComponent(selectedRegion)}` : ""}`
    );
  };

  return (
    <div className="relative">
      {isDropdownOpen && (
        <div
          className="fixed inset-0 z-10 bg-black opacity-50"
          onClick={closeDropdown}
        ></div>
      )}
      <form
        className="relative z-20 flex w-full gap-1"
        onSubmit={onSubmitHandler}
      >
        {showDropdownRegions && (
          <DropdownRegions onSelectRegion={setSelectedRegion} />
        )}
        <div className="header_search">
          <CSearchInput
            value={searchValue}
            onChange={onChangeHandler}
            placeholder="검색어를 입력해 주세요"
            onClick={toggleDropdown}
            className={`z-20 h-[${height}] w-[250px] sm:w-[300px] md:w-[600px]`} // 높이를 prop으로 설정
          />
          <DropDownSearch
            isOpen={isDropdownOpen}
            closeDropdown={closeDropdown}
            dropdownRef={dropdownRef}
            results={filteredResults} // 필터링된 결과 사용
          />
        </div>
        {showButton && (
          <button
            type="button"
            className="h-[60px] w-[70px] rounded-2xl bg-blue-700 text-white"
          >
            검색
          </button>
        )}
      </form>
    </div>
  );
};

export default SearchBar;
