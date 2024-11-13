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
    <section className="mt-[40px] rounded-[12px] border border-[#D9D9D9] px-[30px] py-[40px]">
      <h2 className="color-gray01 flex items-center gap-[5px] text-[24px] font-bold">
        언제 모이나요?
      </h2>

      <div className="mt-[40px] flex items-center gap-[40px]">
        <div className="flex items-center gap-[20px]">
          <p className="color-gray01 flex-none text-[18px] font-medium">
            모임 시작
          </p>
          <div className="input_date">
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
        </div>

        <div className="flex items-center gap-[20px]">
          <p className="color-gray01 flex-none text-[18px] font-medium">
            모임 종료
          </p>
          <div className="input_date">
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
      </div>
    </section>
  );
};

export default MeetCreatorDateSection;
