"use client";

import React from "react";
import { MeetWithCamp } from "../../types/meet.types";
import useMeetCreatorForm from "../../hooks/useMeetCreatorForm";
import MeetCreatorInfoSection from "./meetCreatorSection/MeetCreatorInfoSection";
import MeetCreatorTypeSection from "./meetCreatorSection/MeetCreatorTypeSection";
import MeetCreatorHeadcountSection from "./meetCreatorSection/MeetCreatorHeadcountSection";
import MeetCreatorDateSection from "./meetCreatorSection/MeetCreatorDateSection";
import MeetCreatorSearchSection from "./meetCreatorSection/MeetCreatorSearchSection";
import MeetCreatorContentSection from "./meetCreatorSection/MeetCreatorContentSection";
import PageTitle from "@/_components/common/PageTitle";
import Link from "next/link";

interface Props {
  meetId?: string;
  meetWithCamp: MeetWithCamp;
}

const MeetCreatorForm = ({ meetId, meetWithCamp }: Props) => {
  const {
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    register,
    handleSubmit,
    setValue,
    handleSelectCamp,
    errors,
    location,
    watch,
    handleKeyDown,
    onSubmit,
    searchKeyword,
    handleChangeSearchKeyword,
    isOpen,
    searchList
  } = useMeetCreatorForm({ meetId, meetWithCamp });

  const showDropDown = isOpen && !!searchList && searchList.length > 0;
  const submitText = !!meetId ? "수정하기" : "모임 등록";

  return (
    <div className="meet_write mb-[60px] mt-[90px]">
      <div className="inner m-auto w-full max-w-[1360px] px-[30px]">
        <PageTitle text={"캠핑 모임 만들기"} />
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="relative flex w-full flex-col"
          onKeyDown={handleKeyDown}
        >
          <section className="mt-[40px] flex items-center justify-end gap-[12px] border-b border-b-[#DFE1E6] pb-[15px]">
            <Link
              href="/meets"
              className="flex h-[50px] w-[120px] items-center justify-center rounded-[12px] border border-[#BFBFBF] bg-[#f2f2f2] text-[18px] font-medium"
            >
              목록
            </Link>
            <button
              type="submit"
              className="flex h-[50px] w-[120px] items-center justify-center rounded-[12px] border border-[#FFB180] bg-[#FFB180] text-[18px] font-medium text-[#803200]"
            >
              {submitText}
            </button>
          </section>

          <MeetCreatorInfoSection />

          <MeetCreatorTypeSection watch={watch} setValue={setValue} />

          <MeetCreatorHeadcountSection
            register={register}
            setValue={setValue}
            watch={watch}
          />

          <MeetCreatorSearchSection
            handleSelectCamp={handleSelectCamp}
            searchKeyword={searchKeyword}
            handleChangeSearchKeyword={handleChangeSearchKeyword}
            searchList={searchList}
            showDropDown={showDropDown}
            location={location}
          />

          <MeetCreatorDateSection
            startDate={startDate}
            setStartDate={setStartDate}
            startFormName={"start_date"}
            endDate={endDate}
            setEndDate={setEndDate}
            endFormName={"end_date"}
            setValue={setValue}
          />

          {errors.title && <span>This field is required</span>}

          <MeetCreatorContentSection
            register={register}
            watch={watch}
            setValue={setValue}
          />
          <input
            type="hidden"
            className="border-2"
            {...register("contentId", { required: true })}
          />
          {/* TODO 준비물 기능, 제목 내용 CSS */}
          {/* <input
          className="border-2"
          placeholder="준비물"
          {...register("supplies")}
        />
        <input
          className="border-2"
          type="number"
          {...register("deadline_headcount", {
            min: 2,
            max: 10,
            required: true
          })}
        /> */}
          {errors.deadline_headcount && <span>인원수 확인</span>}
        </form>
      </div>
    </div>
  );
};

export default MeetCreatorForm;
