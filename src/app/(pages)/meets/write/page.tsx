"use client";
import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { MeetRequest } from "../types/meet.types";
import useDate from "../hooks/useDate";
import CDateRangePicker from "@/_components/date/CDateRangePicker";
import CampSelect from "../components/meetsWrite/CampSelect";

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

// interface Input extends Omit<MeetRequest, "camp_id"> {}
type Input = MeetRequest;

const MeetWrite = () => {
  const [startDate, setStartDate] = useDate();
  const [endDate, setEndDate] = useDate();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm<Input>({
    defaultValues: {
      start_date: startDate,
      end_date: endDate
    }
  });
  const onSubmit: SubmitHandler<Input> = (data) => console.log(data);

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="flex w-44 flex-col">
        <CampSelect />
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
          className="border-2"
          {...register("camp_id", { required: true })}
        />
        <input
          className="border-2"
          {...register("title", { required: true })}
        />
        <input className="border-2" {...register("content")} />
        <input className="border-2" {...register("supplies")} />
        {/* <input className="border-2" {...register("start_date")} /> */}
        <input className="border-2" {...register("end_date")} />
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
