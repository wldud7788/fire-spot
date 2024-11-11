import React from "react";
import SearchBar from "../search/searchBar/SearchBar";
import Link from "next/link";
import { TAGS } from "@/_utils/common/constant";

const MainSearch = () => {
  return (
    <div className="mt-10 flex flex-col items-center text-lg font-semibold">
      <div className="flex gap-5">
        {TAGS.map((tag) => (
          <Link key={tag.name} href={tag.href} className="text-[#FF924C]">
            {tag.name}
          </Link>
        ))}
      </div>
      <div className="mt-[14px] w-full max-w-[800px] flex-1">
        <SearchBar variant="main" />
      </div>
    </div>
  );
};

export default MainSearch;
