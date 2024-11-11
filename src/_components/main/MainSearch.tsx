import React from "react";
import SearchBar from "../search/searchBar/SearchBar";
import Link from "next/link";

const MainSearch = () => {
  return (
    <div className="mt-10 flex flex-col items-center">
      <ul className="flex gap-5">
        <Link href={"./search?campingTypes=일반야영장"}>
          <li>#캠핑</li>
        </Link>
        <Link href={"./search?campingTypes=자동차야영장"}>
          <li>#차박</li>
        </Link>
        <Link href={"./search?campingTypes=글램핑"}>
          <li>#글램핑</li>
        </Link>
        <Link href={"./search?amenities=내부화장실"}>
          <li>#내부화장실</li>
        </Link>
        <Link href={"./search?petOption=가능"}>
          <li>#애견동반 가능</li>
        </Link>
      </ul>
      <div className="mt-[14px] w-full max-w-[800px] flex-1">
        <SearchBar variant="main" />
      </div>
    </div>
  );
};

export default MainSearch;
