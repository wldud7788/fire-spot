"use client";

import CDateRangePicker from "@/_components/date/CDateRangePicker";
import useMeetWriteForm from "../hooks/useMeetWriteForm";
import DropDownCampSearch from "../components/meetsWrite/DropDownCampSearch";

/**
 *
 * write할 때 camp 테이블에 데이터 upsert
 *
 * 1. 제목
 * 2. 캠핑장 선택
 * 3. 시작날짜
 * 4. 종료날짜
 * 5. 초보 가능 여부
 * 6. 모집인원
 * 7. 내용
 * 8. 준비물
 */

const MeetWrite = () => {
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
  } = useMeetWriteForm();

  const showDropDown = isOpen && !!searchList && searchList.length > 0;

  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="relative flex w-full flex-col gap-10"
      >
        <div className="mb-20 w-[600px]">
          {errors.camp_id && <span>캠핑장을 선택하세요.</span>}
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
          {...register("camp_id", { required: true })}
        />
        <input
          className="border-2"
          {...register("title", { required: true })}
        />
        <input className="border-2" {...register("content")} />
        <input className="border-2" {...register("supplies")} />
        <input className="border-2" {...register("is_day_trip")} />
        <input
          className="border-2"
          type="number"
          {...register("deadline_headcount", { min: 2, max: 10 })}
        />
        {errors.deadline_headcount && <span>This 인원수 확인 is required</span>}
        <input className="border-2" {...register("deadline_date")} />

        <input type="submit" />
      </form>
    </div>
  );
};

export default MeetWrite;
