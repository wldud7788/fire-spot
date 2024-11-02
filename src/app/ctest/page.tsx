import Calendar from "@/_components/calendar/Calendar";
import React from "react";

// TODO 캘린더 테스트 용 페이지입니다. (나중에 /ctest/page.tsx 제거)
const page = () => {
  return (
    <div className="w-full max-w-[1360] px-[30px]">
      <Calendar />;
    </div>
  );
};

export default page;
