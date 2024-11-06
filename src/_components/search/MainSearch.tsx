import React from "react";
import SearchBar from "./searchBar/SearchBar";

const MainSearch = () => {
  return (
    <div className="mt-[100px] flex flex-col items-center">
      <h2 className="text-5xl font-black">어디로 가시나요?</h2>
      <ul className="mt-[50px] flex gap-5">
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
