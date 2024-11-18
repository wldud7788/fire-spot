import React from "react";
import SearchBar from "../search/searchBar/SearchBar";
import Link from "next/link";
import { TAGS } from "@/_utils/common/constant";

const MainSearch = () => {
  return (
    <div className="mt-10 flex flex-col items-center">
      <ul className="flex flex-wrap items-center justify-center gap-3 px-4 md:gap-[20px] max-767:gap-[10px]">
        {TAGS.map((tag) => (
          <Link
            key={tag.name}
            href={tag.href}
            className="color-main whitespace-nowrap text-[15px] md:text-[16px] max-767:text-[12px]"
          >
            {tag.name}
          </Link>
        ))}
      </ul>
      <div className="mt-[14px] w-full max-w-[800px] flex-1 px-4 max-767:p-0">
        <SearchBar variant="main" />
      </div>
    </div>
  );
};

export default MainSearch;
