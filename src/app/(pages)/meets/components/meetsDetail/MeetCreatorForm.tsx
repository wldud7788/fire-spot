"use client";

import React from "react";
import DropDownCampSearch from "../meetsWrite/DropDownCampSearch";
import CDateRangePicker from "@/_components/date/CDateRangePicker";
import { MeetWithCamp } from "../../types/meet.types";
import useMeetCreatorForm from "../../hooks/useMeetCreatorForm";

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
    onSubmit,
    searchKeyword,
    handleChangeSearchKeyword,
    isOpen,
    searchList
  } = useMeetCreatorForm(meetWithCamp);
  const showDropDown = isOpen && !!searchList && searchList.length > 0;

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="relative flex w-full flex-col gap-10"
    >
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
      <label>
        <input
          type="radio"
          value="true"
          {...register("is_newbie", { required: true })} // is_newbie 필드 등록
        />
        초보 가능
      </label>

      <label>
        <input
          type="radio"
          value="false"
          {...register("is_newbie", { required: true })} // 동일한 이름으로 등록
        />
        초보 불가능
      </label>
      <input
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
      />
      {errors.deadline_headcount && <span>인원수 확인</span>}
      {/* <input className="border-2" {...register("is_day_trip")} /> */}
      {/* <input className="border-2" {...register("deadline_date")} /> */}

      <input type="submit" />
    </form>
  );
};

export default MeetCreatorForm;
