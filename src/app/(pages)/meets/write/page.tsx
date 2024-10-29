"use client";
import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { MeetRequest } from "../types/meet.types";
import { DateRangePicker } from "react-date-range";
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

const a = `https://apis.data.go.kr/B551011/GoCamping/searchList?serviceKey=G5%2FwdM%2BoTwjgjfBoPE4wk2zBlY3WolaJGLBI7yOEh36qItxUfgRRqvcWRHgAH86RY5vLFBD6e3i%2Fyn53pK%2Bt9w%3D%3D&MobileOS=ETC&MobileApp=AppTest&pageNo=1&numOfRows=5&_type=json&keyword=`;

const CampSelect = () => {
  const [test, setTest] = useState("");
  const [se, seSe] = useState();

  useEffect(() => {
    const getCampSearchList = async () => {
      const keyword = encodeURI(test);

      const res = await fetch(a + test);
      const data = await res.json();

      console.log("data", data);
    };

    getCampSearchList();
  }, [test]);
  const handleSearchKeyword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTest(e.target.value);
  };

  console.log(test);
  // return <input type="text" onChange={(e) => handleSearchKeyword(e)}/>;
  return (
    // <div className="h-40 bg-slate-400">
    <input
      type="text"
      className="h-40 border-4"
      onChange={handleSearchKeyword}
    />
    // </div>
  );
};

const MeetWrite = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm<Input>();
  const onSubmit: SubmitHandler<Input> = (data) => console.log(data);

  // * 1. 제목
  // * 2. 캠핑장 선택
  // * 3. 시작날짜
  // * 4. 종료날짜
  // * 5. 초보 가능 여부
  // * 6. 모집인원
  // * 7. 내용
  // * 8. 준비물

  return (
    <div>
      <CampSelect />
      <form onSubmit={handleSubmit(onSubmit)} className="flex w-44 flex-col">
        {/* <input  {...register("camp_id")} placeholder="" /> */}
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
        <input className="border-2" {...register("start_date")} />
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
