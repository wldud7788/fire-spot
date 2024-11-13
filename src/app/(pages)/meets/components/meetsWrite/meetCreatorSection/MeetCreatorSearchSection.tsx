import React from "react";
import DropDownCampSearch from "../DropDownCampSearch";
import { CampInsert } from "../../../types/camp.types";

interface Props {
  handleSelectCamp: (camp: CampInsert) => void;
  searchKeyword: string;
  handleChangeSearchKeyword: (
    e: React.ChangeEvent<HTMLInputElement>
  ) => () => void;
  searchList: CampInsert[];
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
    <section className="mt-[40px] rounded-[12px] border border-[#D9D9D9] px-[30px] py-[40px]">
      <h2 className="color-gray01 flex items-center gap-[5px] text-[24px] font-bold">
        어디서 만나나요?
      </h2>

      <div className="mt-[40px] flex items-center gap-[60px]">
        <div className="flex w-full max-w-[410px] flex-col gap-[10px]">
          <div className="flex items-center gap-[20px]">
            <p className="color-gray01 flex-none text-[18px] font-medium">
              캠핑장 이름
            </p>
            <div className="relative w-full">
              <input
                type="text"
                className="h-[47px] w-full rounded-[6px] border-[1px] border-[#C3C3C3] bg-white px-[16px] py-[12px]"
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
          </div>
          <div className="flex items-center gap-[20px]">
            <p className="color-gray01 flex-none text-[18px] font-medium">
              캠핑장 주소
            </p>
            <input
              type="text"
              className="h-[47px] w-full rounded-[6px] border-[1px] border-[#C3C3C3] bg-white px-[16px] py-[12px]"
              value={location}
              placeholder="캠핑장 주소"
              disabled
            />
          </div>
        </div>
        <div className="import_box">
          <p className="mb-[5px] bg-import bg-left-center-0 bg-no-repeat pl-[24px] text-[16px] text-[#a4a4a4]">
            장소를 정할 때 주의해주세요.
          </p>
          <div className="text_box pl-[10px]">
            <p className="before-dot-left relative pl-[10px] text-[14px] text-[#a4a4a4]">
              캠핑 장소가 복잡하거나 찾기 어려울 경우에는 모임 소개에 자세하게
              설명해주세요.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MeetCreatorSearchSection;
