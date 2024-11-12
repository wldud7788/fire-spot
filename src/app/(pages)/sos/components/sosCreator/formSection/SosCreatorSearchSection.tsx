import React from "react";
import DropDownCampSearch from "@/app/(pages)/meets/components/meetsWrite/DropDownCampSearch";
import { CampInsert } from "@/app/(pages)/meets/types/camp.types";

type Props = {
  handleSelectCamp: (sos: CampInsert) => void;
  searchKeyword: string;
  handleChangeSearchKeyword: (
    e: React.ChangeEvent<HTMLInputElement>
  ) => () => void;
  searchList: CampInsert[];
  showDropDown: boolean;
  location: string;
};

const SosCreatorSearchSection = ({
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
  );
};

export default SosCreatorSearchSection;
