import { Camp } from "@/app/(pages)/camps/types/Camp";
import Link from "next/link";
import React from "react";

const DropDownSearch: React.FC<{
  isOpen: boolean;
  closeDropdown: () => void;
  results: Camp[];
  dropdownRef: React.RefObject<HTMLDivElement>;
}> = ({ isOpen, closeDropdown, dropdownRef, results }) => {
  if (!isOpen) return null;

  return (
    <div
      ref={dropdownRef}
      className="absolute top-0 w-full rounded-2xl border border-slate-300 bg-white p-[25px] pt-[50px] shadow-md"
    >
      {/* 검색의 드롭다운 내용 */}
      <ul className="max-h-60 overflow-y-auto">
        {results?.length > 0 ? (
          results.map((camp) => (
            <Link
              href={`camp-detail/${camp.contentId}`}
              onClick={closeDropdown}
              key={camp.contentId}
            >
              <li className="flex cursor-pointer space-x-4 p-2 hover:bg-gray-100">
                {camp.firstImageUrl ? (
                  <img
                    src={`${camp.firstImageUrl}`}
                    className="h-[80px] w-[100px]"
                    alt="캠핑 썸네일"
                  />
                ) : (
                  <img
                    src={"/assets/images/default_profile.jpeg"}
                    className="h-[80px] w-[100px]"
                    alt="캠핑 썸네일"
                  />
                )}
                <div className="flex flex-col">
                  <h2 className="max-w-[200px] overflow-hidden truncate whitespace-nowrap">
                    {camp.facltNm}
                  </h2>
                  <p>{camp.doNm}</p>
                </div>
              </li>
            </Link>
          ))
        ) : (
          <div className="p-2">검색 결과가 없습니다.</div>
        )}
      </ul>
    </div>
  );
};

export default DropDownSearch;
