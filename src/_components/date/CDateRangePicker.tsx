import { MeetRequest } from "@/app/(pages)/meets/types/meet.types";
import React from "react";
import DatePicker, { registerLocale, setDefaultLocale } from "react-datepicker";
import { UseFormSetValue } from "react-hook-form";
import "react-datepicker/dist/react-datepicker.css";
import { ko } from "date-fns/locale";
registerLocale("ko", ko);

interface Props {
  startDate: Date;
  setStartDate: React.Dispatch<React.SetStateAction<Date>>;
  startFormName: keyof MeetRequest;
  endDate: Date;
  setEndDate: React.Dispatch<React.SetStateAction<Date>>;
  endFormName: keyof MeetRequest;
  setValue: UseFormSetValue<MeetRequest>;
}

const CDateRangePicker = ({
  startDate,
  setStartDate,
  startFormName,
  endDate,
  setEndDate,
  endFormName,
  setValue
}: Props) => {
  return (
    <div className="flex">
      <DatePicker
        selected={startDate} // 상태 변수를 사용
        onChange={(date) => {
          const value = date ? date : new Date();

          setStartDate(value); // 상태 업데이트
          setValue(startFormName, value); // react-hook-form에 날짜 설정
        }}
        showTimeSelect
        dateFormat="MMMM d일 aa h:mm"
        locale="ko"
      />
      <span>~</span>
      <DatePicker
        selected={endDate} // 상태 변수를 사용
        onChange={(date) => {
          const value = date ? date : new Date();

          setEndDate(value); // 상태 업데이트
          setValue(endFormName, value); // react-hook-form에 날짜 설정
        }}
        showTimeSelect
        dateFormat="MMMM d일 aa h:mm"
        locale="ko"
      />
    </div>
  );
};

export default CDateRangePicker;
