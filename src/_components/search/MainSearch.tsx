import React from "react";
import SearchBar from "./searchBar/SearchBar";

const MainSearch = () => {
  return (
    <div className="my-[41px] flex flex-col items-center gap-[14px]">
      <ul className="flex gap-5">
        <li>#제주</li>
        <li>#제주</li>
        <li>#제주</li>
        <li>#제주</li>
        <li>#제주</li>
      </ul>
      <div className="flex-1">
        <div className="relative">
          <SearchBar variant="main" />
        </div>
      </div>
    </div>
  );
};

export default MainSearch;
