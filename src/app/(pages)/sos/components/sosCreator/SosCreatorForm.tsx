"use client";
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
    <div className="mx-auto w-full max-w-[1360px] pl-[30px] pr-[30px] pt-[30px] font-pretendard">
      <section className="flex h-[60px] items-center">
        <h2 className="text-5xl font-bold">SOS 만들기</h2>
      </section>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="relative mt-20 flex w-full flex-col"
      >
        <section className="flex h-[120px] items-center justify-end border-b-[2px] border-t-[2px]">
          <button
            type="submit"
            className={`h-[51px] rounded-[6px] bg-[#D9D9D9] pl-12 pr-12 text-xl`}
          >
            {submitText}
          </button>
        </section>

        <SosCreatorTypeSection watch={watch} setValue={setValue} />
        <SosCreatorInfoSection />

        {errors.title && <span>This field is required</span>}

        <SosCreatorContentSection register={register} />
        <SosCreatorTagSection watch={watch} setValue={setValue} />

        <SosCreatorSearchSection
          handleSelectCamp={handleSelectCamp}
          searchKeyword={searchKeyword}
          handleChangeSearchKeyword={handleChangeSearchKeyword}
          searchList={searchList}
          showDropDown={showDropDown}
          location={location}
        />
        <input
          type="hidden"
          className="border-2"
          {...register("contentId", { required: true })}
        />
      </form>
    </div>
  );
};

export default SosCreatorForm;
