import { format } from "date-fns";
import React from "react";

type Schedule = {
  // id: number;
  id: Date;
  type: string; // stamp | meet
  content: string;
  prev: boolean;
  next: boolean;
};

// items.push({
//   day: i,
//   schedules: [
//     {
//       id: i,
//       type: "stamp",
//       content: "가평 어디",
//       prev: false,
//       next: false
//     },
//     {
//       id: addDays(i, 100),
//       type: "stamp",
//       content: "가평 어디",
//       prev: false,
//       next: false
//     }
//   ]
// });

type Props = {
  day: Date;
  schedules: Schedule[];
};

// 캘린더 한 칸
const CalendarCell = ({ day, schedules }: Props) => {
  const isPrevExistClassName = "pr-2";
  const isNextExistClassName = "pl-2";
  const isPrevAndNextExistClassName = "";
  const isNotExistClassName = "pr-2 pl-2";

  return (
    <li className="flex w-full flex-col border-[1px]">
      <section className="flex h-[20px] w-full justify-end">
        <p>{format(day, "d")}</p>
      </section>
      <section className="flex flex-col">
        {schedules.map((schedule) => (
          <div key={schedule.id.toISOString()} className="bg-slate-500">
            {schedule.content}
          </div>
        ))}
      </section>
    </li>
  );
};

export default CalendarCell;
