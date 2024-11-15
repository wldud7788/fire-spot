import React from "react";
import SearchBar from "../search/searchBar/SearchBar";
import Link from "next/link";
import { TAGS } from "@/_utils/common/constant";

const MainSearch = () => {
  return (
    <div className="mt-10 flex flex-col items-center">
      <ul className="flex items-center gap-[20px] max-1460:gap-[10px]">
        {TAGS.map((tag) => (
          <Link
            key={tag.name}
            href={tag.href}
            className="color-main text-[16px] max-1460:text-[14px]"
          >
            {tag.name}
          </Link>
        ))}
      </ul>
      <div className="mt-[14px] w-full max-w-[800px] flex-1">
        <SearchBar variant="main" />
      </div>
    </div>
  );
};

export default MainSearch;
