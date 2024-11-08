import React from "react";
import SearchBar from "./searchBar/SearchBar";
import Link from "next/link";

const MainSearch = () => {
  return (
    <div className="mt-10 flex flex-col items-center">
      <ul className="flex gap-5">
        <Link href={"./search/"}>
          <li>#캠핑여행</li>
        </Link>
        <Link href={"./"}>
          <li>#차박</li>
        </Link>
        <Link href={"./"}>
          <li>#오토캠핑</li>
        </Link>
        <Link href={"./"}>
          <li>#글램핑</li>
        </Link>
        <Link href={"./"}>
          <li>#내부화장실</li>
        </Link>
      </ul>
      <div className="mt-[14px] w-full max-w-[800px] flex-1">
        <SearchBar variant="main" />
      </div>
    </div>
  );
};

export default MainSearch;
