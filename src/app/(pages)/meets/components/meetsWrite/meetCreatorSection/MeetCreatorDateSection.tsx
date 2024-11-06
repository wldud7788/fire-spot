import React from "react";
import { MeetInsert } from "../../../types/meet.types";
import { UseFormSetValue } from "react-hook-form";
import "react-datepicker/dist/react-datepicker.css";
import "./datePicker.custom.css";
import { ko } from "date-fns/locale";
import DatePicker, { registerLocale } from "react-datepicker";
import { addDays } from "date-fns";
registerLocale("ko", ko);

interface Props {
  startDate: Date;
  setStartDate: (date: Date) => void;
  startFormName: keyof MeetInsert;
  endDate: Date;
  setEndDate: (date: Date) => void;
  endFormName: keyof MeetInsert;
  setValue: UseFormSetValue<MeetInsert>;
}

const MeetCreatorDateSection = ({
  startDate,
  setStartDate,
  startFormName,
  endDate,
  setEndDate,
  endFormName,
  setValue
}: Props) => {
  const handleCloseStartDate = () => {
    if (startDate < addDays(new Date(), 1)) {
      alert("최소 하루 뒤부터 작성이 가능합니다.");
      setStartDate(addDays(new Date(), 1));
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
    <section className="mt-40 flex flex-col gap-5 rounded-[20px] border-[1px] border-[#B5B5B5] px-[53px] py-10">
      <div className="flex items-center gap-3">
        <div className="h-6 w-6 bg-date bg-cover bg-center" />
        <h2 className="text-[20px]">날짜와 시간</h2>
      </div>
      <div className="flex items-center gap-2">
        <div className="h-6 w-6 bg-dateStroke bg-cover bg-center" />
        <div className="flex h-[45px] w-[162px] items-center rounded-[6px] border-[1px] border-[#AAA] p-2 text-[15px] text-[#BFBFBF]">
          <DatePicker
            selected={startDate}
            onChange={(date) => {
              const value = date ? date : addDays(new Date(), 1);
              setStartDate(value);
              setValue(startFormName, value);
            }}
            showTimeSelect
            dateFormat="MMMM d일 aa h:mm"
            locale="ko"
            onCalendarClose={handleCloseStartDate}
          />
        </div>
        <div className="flex h-[45px] w-[162px] items-center rounded-[6px] border-[1px] border-[#AAA] p-2 text-[15px] text-[#BFBFBF]">
          <DatePicker
            selected={endDate}
            onChange={(date) => {
              const value = date ? date : addDays(new Date(), 1);

              setEndDate(value);
              setValue(endFormName, value);
            }}
            showTimeSelect
            dateFormat="MMMM d일 aa h:mm"
            locale="ko"
            onCalendarClose={handleCloseEndDate}
          />
        </div>
      </div>
    </section>
  );
};

export default MeetCreatorDateSection;
