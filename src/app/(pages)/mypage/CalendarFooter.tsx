"use client";

import React from "react";
import { useCalendarFooter } from "./hooks/useCalendar";

const CalendarFooter = () => {
  const { feedCount, meetAttendeeCount } = useCalendarFooter();

  return (
    <div className="flex w-full justify-between gap-[55px]">
      <section className="flex h-[137px] w-[calc(50%-55px)] items-center justify-center gap-[71px] rounded-[12px] bg-[#F6F2E5]">
        <div className="flex gap-[11px]">
          <div className="h-[53px] w-[40px] bg-stamp bg-cover" />
          <div className="flex flex-col items-start justify-start">
            <span>나의 스탬프</span>
            <span>{feedCount} 개</span>
          </div>
        </div>
        <div className="flex gap-[11px]">
          <span className="h-[53px] w-[40px] bg-meet bg-cover" />
          <div className="flex flex-col items-start justify-start">
            <span>나의 모임</span>
            <span>{meetAttendeeCount} 개</span>
          </div>
        </div>
      </section>
      <section className="flex h-[137px] w-[calc(50%-55px)] flex-col gap-2 rounded-[12px] bg-[#F4F4F4] px-7 py-[35px]">
        <div className="flex items-center">
          <span className="h-5 w-5 bg-flag" />
          <h3>스탬프란?</h3>
        </div>
        <p>
          캠핑 후기를 작성하거나, 모임에 참여하면 스탬프가 각각 하나씩
          발급됩니다. 스탬프를 모아 캘린더를 꾸며보세요.
        </p>
      </section>
    </div>
  );
};

export default CalendarFooter;
