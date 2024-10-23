import React from "react";
import { format } from "date-fns";

type Props = {
  currentMonth: Date;
  prevMonth: () => void;
  nextMonth: () => void;
};

const CalendarHeader = ({ currentMonth, prevMonth, nextMonth }: Props) => {
  return (
    <div className="flex">
      <div className="">
        <span className="">
          <span className="">{format(currentMonth, "M")}월</span>
          {format(currentMonth, "yyyy")}
        </span>
      </div>
      <div className="flex">
        <div onClick={prevMonth}>{"<="}</div>
        <div onClick={nextMonth}>{"=>"}</div>
      </div>
    </div>
  );
};

export default CalendarHeader;
