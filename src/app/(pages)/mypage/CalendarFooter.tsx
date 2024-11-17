"use client";

import React from "react";
import { useCalendarFooter } from "./hooks/useCalendar";

const CalendarFooter = () => {
  const { reviewCount, meetAttendeeCount } = useCalendarFooter();

  return (
    <section className="mt-[26px] flex w-full gap-[55px] max-1280:gap-[20px] max-1160:flex-col">
      <div className="flex h-[137px] w-[50%] flex-1 items-center justify-center gap-[70px] rounded-[12px] bg-[#F6F2E5] max-1280:w-[calc(50%-10px)] max-1160:w-full max-1160:py-[20px]">
        <div className="flex items-center gap-[11px]">
          <img
            src="/assets/images/mypage/ico-mypage-fire.svg"
            alt="나의 스탬프"
          />
          <div className="flex flex-col items-start justify-start">
            <span className="color-gray03 text-[12px] font-medium">
              나의 스탬프
            </span>
            <span className="color-gray01 text-[18px]">{reviewCount} 개</span>
          </div>
        </div>
        <div className="flex items-center gap-[11px]">
          <img
            src="/assets/images/mypage/ico-mypage-hand.svg"
            alt="나의 모임"
          />
          <div className="flex flex-col items-start justify-start">
            <span className="color-gray03 text-[12px] font-medium">
              나의 모임
            </span>
            <span className="color-gray01 text-[18px]">
              {meetAttendeeCount} 개
            </span>
          </div>
        </div>
      </div>

      <div className="flex h-[137px] w-[50%] flex-1 flex-col gap-[13px] rounded-[12px] bg-[#F4F4F4] px-7 py-[35px] max-1280:w-[calc(50%-10px)] max-1160:w-full max-1160:py-[20px]">
        <div className="flex items-center">
          <img
            src="/assets/images/mypage/ico-mypage-flag.svg"
            alt="스탬프 깃발"
          />
          <h3 className="color-gray01 text-[14px] font-bold">스탬프란?</h3>
        </div>
        <p className="color-gray01 text-[14px]">
          캠핑 후기를 작성하거나, 모임에 참여하면 스탬프가 각각 하나씩
          발급됩니다. 스탬프를 모아 캘린더를 꾸며보세요.
        </p>
      </div>
    </section>
  );
};

export default CalendarFooter;
