"use client";
import React from "react";
interface TabListProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const TabList: React.FC<TabListProps> = ({ activeTab, setActiveTab }) => {
  return (
    <div className="mb-[40px] flex items-center justify-center gap-[70px] border-b border-b-[#BFBFBF]">
      <button
        className="color-gray01 relative pb-[25px] text-[18px]"
        onClick={() => setActiveTab("myMeetings")}
      >
        나의 모임
      </button>
      <button
        className="color-gray01 relative pb-[25px] text-[18px]"
        onClick={() => setActiveTab("campingReviews")}
      >
        캠핑후기
      </button>
      <button
        className="color-gray01 relative pb-[25px] text-[18px]"
        onClick={() => setActiveTab("calendar")}
      >
        캘린더
      </button>
      <button
        className="color-gray01 relative pb-[25px] text-[18px]"
        onClick={() => setActiveTab("bookmarks")}
      >
        북마크
      </button>
      <button
        className="color-gray01 relative pb-[25px] text-[18px]"
        onClick={() => setActiveTab("followers")}
      >
        팔로워
      </button>
    </div>
  );
};

export default TabList;
