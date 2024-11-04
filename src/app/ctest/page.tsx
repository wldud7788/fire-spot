import Calendar from "@/_components/calendar/Calendar";
import React from "react";

// TODO 캘린더 테스트 용 페이지입니다. (나중에 /ctest/page.tsx 제거)
const page = () => {
  // TODO 캘린더 데이터 불러올때 meet가 아닌 meet_attendee기준으로 불러와야함
  return (
    <div className="w-full max-w-[1360px] px-[30px]">
      <Calendar />
    </div>
  );
};

export default page;
