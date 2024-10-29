import { MeetRequest } from "@/app/(pages)/meets/types/meet.types";
import React from "react";
import DatePicker, { registerLocale, setDefaultLocale } from "react-datepicker";
import { UseFormSetValue } from "react-hook-form";
import "react-datepicker/dist/react-datepicker.css";
import { ko } from "date-fns/locale";
registerLocale("ko", ko);

interface Props {
  selectedDate: Date;
  setDate: React.Dispatch<React.SetStateAction<Date>>;
  setValue: UseFormSetValue<MeetRequest>;
  name: keyof MeetRequest;
}

const CDateRangePicker = ({ selectedDate, setDate, setValue, name }: Props) => {
  return (
    <DatePicker
      selected={selectedDate} // 상태 변수를 사용
      onChange={(date) => {
        const value = date ? date : new Date();

        setDate(value); // 상태 업데이트
        setValue(name, value); // react-hook-form에 날짜 설정
      }}
      showTimeSelect
      dateFormat="MMMM d일 aa h:mm"
      locale="ko"
    />
  );
};

export default CDateRangePicker;
