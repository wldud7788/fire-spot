import React from "react";
import DropDownCampSearch from "../DropDownCampSearch";
import { CampToDB } from "../../../types/camp.types";

interface Props {
  handleSelectCamp: (camp: CampToDB) => void;
  searchKeyword: string;
  handleChangeSearchKeyword: (
    e: React.ChangeEvent<HTMLInputElement>
  ) => () => void;
  searchList: CampToDB[];
  showDropDown: boolean;
  location: string;
}

const MeetCreatorSearchSection = ({
  handleSelectCamp,
  searchKeyword,
  handleChangeSearchKeyword,
  searchList,
  showDropDown,
  location
}: Props) => {
  return (
    <section className="mt-40 flex h-[345px] flex-col gap-5 rounded-[20px] border-[1px] border-[#B5B5B5] px-[53px] py-10">
      <div className="flex items-center gap-3">
        <h2 className="text-[20px]">어디서 만나나요</h2>
      </div>
      <div className="relative mb-20 w-1/2 max-w-[400px]">
        <input
          type="text"
          className="h-[45px] w-full rounded-[6px] border-2 bg-[#EEE] px-4"
          value={location}
          placeholder="캠핑장 주소"
          disabled
        />
        <input
          type="text"
          className="h-[45px] w-full rounded-[6px] border-2 bg-white px-4"
          value={searchKeyword}
          onChange={handleChangeSearchKeyword}
          placeholder="캠핑장을 검색하세요."
        />
        {showDropDown && (
          <div className="absolute top-[45px] w-full">
            <DropDownCampSearch
              camps={searchList}
              handleSelectCamp={handleSelectCamp}
            />
          </div>
        )}
      </div>
    </section>

    // <div className="absolute top-10 w-full rounded-2xl border border-slate-300 bg-white p-[25px] pt-[50px] shadow-md">
    //   <ul className="max-h-60 overflow-y-auto">
    //     {searchList.map((camp) => (
    //       <li
    //         key={camp.contentId}
    //         className="cursor-pointer p-2 hover:bg-gray-100"
    //         onClick={() => handleSelectCamp(camp)}>
    //         {camp.facltNm}
    //       </li>
    //     ))}
    //   </ul>
    // </div>
    // <DropDownCampSearch
    //   camps={searchList}
    //   handleSelectCamp={handleSelectCamp}
    // />
  );
};

export default MeetCreatorSearchSection;
