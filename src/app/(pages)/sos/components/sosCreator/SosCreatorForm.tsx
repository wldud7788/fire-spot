"use client";
import PageTitle from "@/_components/common/PageTitle";
import useSosCreatorForm from "../../hooks/useSosCreatorForm";
import { SosWithCamp } from "../../types/sos.types";
import SosCreatorContentSection from "./formSection/SosCreatorContentSection";
import SosCreatorInfoSection from "./formSection/SosCreatorInfoSection";
import SosCreatorSearchSection from "./formSection/SosCreatorSearchSection";
import SosCreatorTagSection from "./formSection/SosCreatorTagSection";
import SosCreatorTypeSection from "./formSection/SosCreatorTypeSection";

interface Props {
  sosId?: number;
  sosWithCamp: SosWithCamp;
}

const SosCreatorForm = ({ sosId, sosWithCamp }: Props) => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    handleKeyDown,
    onSubmit,
    errors,
    isOpen,
    handleSelectCamp,
    searchKeyword,
    handleChangeSearchKeyword,
    searchList,
    location
  } = useSosCreatorForm({ sosId, sosWithCamp });

  const showDropDown = isOpen && !!searchList && searchList.length > 0;
  const submitText = !!sosId ? "수정하기" : "만들기";

  return (
    <div className="meet_write mb-[60px] mt-[90px]">
      <div className="inner m-auto w-full max-w-[1360px] px-[30px] max-989:px-[15px]">
        <PageTitle text={"SOS 요청하기"} />
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="relative flex w-full flex-col"
          onKeyDown={handleKeyDown}
        >
          <section className="mt-[40px] flex items-center justify-end gap-[12px] border-b border-b-[#DFE1E6] pb-[15px]">
            <button
              type="submit"
              className={`h-[51px] rounded-[6px] bg-[#D9D9D9] pl-12 pr-12 text-xl`}
            >
              {submitText}
            </button>
          </section>

          {/* (긴급, 캠핑질문 등 선택 섹션) */}
          <SosCreatorTypeSection watch={watch} setValue={setValue} />

          {/* sos 정보  */}
          <SosCreatorInfoSection />

          {errors.title && <span>This field is required</span>}

          {/* sos 타이틀, 내용  */}
          <SosCreatorContentSection register={register} />

          {/* 캠핑장 검색 */}
          <SosCreatorSearchSection
            handleSelectCamp={handleSelectCamp}
            searchKeyword={searchKeyword}
            handleChangeSearchKeyword={handleChangeSearchKeyword}
            searchList={searchList}
            showDropDown={showDropDown}
            location={location}
          />

          {/* sos 태그 */}
          <SosCreatorTagSection watch={watch} setValue={setValue} />

          <input
            type="hidden"
            className="border-2"
            {...register("contentId", { required: true })}
          />
        </form>
      </div>
    </div>
  );
};

export default SosCreatorForm;
