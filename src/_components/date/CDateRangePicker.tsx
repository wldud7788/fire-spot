import { MeetForm } from "@/app/(pages)/meets/types/meet.types";
import React from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import { UseFormSetValue } from "react-hook-form";
import "react-datepicker/dist/react-datepicker.css";
import { ko } from "date-fns/locale";
registerLocale("ko", ko);

interface Props {
  startDate: Date;
  setStartDate: (date: Date) => void;
  startFormName: keyof MeetForm;
  endDate: Date;
  setEndDate: (date: Date) => void;
  endFormName: keyof MeetForm;
  setValue: UseFormSetValue<MeetForm>;
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
  const handleCloseStartDate = () => {
    if (startDate < new Date()) {
      alert("이전 날짜 입력 안됨");
      setStartDate(new Date());
    }
    if (startDate > endDate) {
      setEndDate(startDate);
    }
  };

  const handleCloseEndDate = () => {
    if (endDate < startDate) {
      alert("시작 날짜 보다 이전 이면 안됨");
      setEndDate(startDate);
    }
  };

  return (
    <div className="flex">
      <DatePicker
        selected={startDate}
        onChange={(date) => {
          const value = date ? date : new Date();
          setStartDate(value);
          setValue(startFormName, value);
        }}
        showTimeSelect
        dateFormat="MMMM d일 aa h:mm"
        locale="ko"
        onCalendarClose={handleCloseStartDate}
      />
      <span>~</span>
      <DatePicker
        selected={endDate}
        onChange={(date) => {
          const value = date ? date : new Date();

          setEndDate(value);
          setValue(endFormName, value);
        }}
        showTimeSelect
        dateFormat="MMMM d일 aa h:mm"
        locale="ko"
        onCalendarClose={handleCloseEndDate}
      />
    </div>
  );
};

export default CDateRangePicker;
