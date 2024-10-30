import Link from "next/link";
import React from "react";

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
      {/* 검색의 드롭다운 내용 */}
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

export default DropDownSearch;
