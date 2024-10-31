"use client";

import React from "react";
import DropDownCampSearch from "./DropDownCampSearch";
import CDateRangePicker from "@/_components/date/CDateRangePicker";
import { MeetWithCamp } from "../../types/meet.types";
import useMeetCreatorForm from "../../hooks/useMeetCreatorForm";
import MeetCreatorInfoSection from "./meetCreatorSection/MeetCreatorInfoSection";
import MeetCreatorTypeSection from "./meetCreatorSection/MeetCreatorTypeSection";

const MeetCreatorForm = ({ meetWithCamp }: { meetWithCamp: MeetWithCamp }) => {
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
    watch,
    onSubmit,
    searchKeyword,
    handleChangeSearchKeyword,
    isOpen,
    searchList
  } = useMeetCreatorForm(meetWithCamp);

  const showDropDown = isOpen && !!searchList && searchList.length > 0;

  return (
    <div className="mx-auto w-full max-w-[1360px] pl-[30px] pr-[30px] pt-[30px] font-pretendard">
      <section className="flex h-[60px] items-center">
        <h2 className="text-5xl font-bold">모임 만들기</h2>
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
            만들기
          </button>
        </section>

        <MeetCreatorInfoSection />

        <MeetCreatorTypeSection watch={watch} setValue={setValue} />

        {/* <section className="mt-[123px]">
          <h2 className="mb-[70px] text-xl font-[500]">캠핑 유형</h2>
          <div className="flex gap-[14px] border-b-[1px] border-[#D4D4D4] pb-[37px] font-[15px]">
            {Object.entries(groundTypes).map(([key, value]) => (
              <button
                key={key}
                type="button"
                onClick={() => {
                  // 선택된 값으로 설정
                  setValue("ground_type", key);
                }}
                className={`h-[45px] rounded-[22.5px] border-[1px] border-[#C3C3C3] px-4 py-[14px] pb-2 pl-7 pr-7 pt-2 text-[#A4A4A4] ${watch("ground_type") === key ? "bg-[#D9D9D9] font-[600]" : ""}`}>
                {value}
              </button>
            ))}
          </div>
          <div className="flex gap-[14px] border-b-[1px] border-[#D4D4D4] pt-[37px] font-[15px]">
            <button
              type="button"
              onClick={() => {
                // 선택된 값으로 설정
                setValue("is_newbie", true);
              }}
              className={`h-[45px] rounded-[22.5px] border-[1px] border-[#C3C3C3] px-4 py-[14px] pb-2 pl-7 pr-7 pt-2 text-[#A4A4A4] ${watch("is_newbie") === true ? "bg-[#D9D9D9] font-[600]" : ""}`}>
              초보가능
            </button>
            <button
              type="button"
              onClick={() => {
                // 선택된 값으로 설정
                setValue("is_newbie", false);
              }}
              className={`h-[45px] rounded-[22.5px] border-[1px] border-[#C3C3C3] px-4 py-[14px] pb-2 pl-7 pr-7 pt-2 text-[#A4A4A4] ${watch("is_newbie") === false ? "bg-[#D9D9D9] font-[600]" : ""}`}>
              숙련자
            </button>
          </div>
        </section> */}

        <div className="mb-20 w-[600px]">
          {errors.contentId && <span>캠핑장을 선택하세요.</span>}
          <input
            type="text"
            className="border-4"
            value={searchKeyword}
            onChange={handleChangeSearchKeyword}
            placeholder="캠핑장을 검색하세요."
          />
          {showDropDown && (
            <DropDownCampSearch
              camps={searchList}
              handleSelectCamp={handleSelectCamp}
            />
          )}
        </div>
        <CDateRangePicker
          startDate={startDate}
          setStartDate={setStartDate}
          startFormName={"start_date"}
          endDate={endDate}
          setEndDate={setEndDate}
          endFormName={"end_date"}
          setValue={setValue}
        />
        {errors.title && <span>This field is required</span>}
        <input
          type="hidden"
          className="border-2"
          {...register("contentId", { required: true })}
        />
        <input
          className="border-2"
          placeholder="제목"
          {...register("title", { required: true })}
        />
        <input
          className="border-2"
          placeholder="내용"
          {...register("content", { required: true })}
        />
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
  );
};

export default MeetCreatorForm;
