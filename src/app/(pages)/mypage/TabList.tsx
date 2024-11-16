"use client";
import React from "react";
interface TabListProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const TabList: React.FC<TabListProps> = ({ activeTab, setActiveTab }) => {
  return (
    <div className="mypage_tab mb-[40px] flex items-center justify-center gap-[70px] border-b border-b-[#BFBFBF] max-989:gap-[35px] max-767:gap-[15px]">
      <button
        className={`color-gray01 relative pb-[25px] text-[18px] max-989:pb-[15px] max-989:text-[16px] max-767:pb-[10px] max-767:text-[14px] ${activeTab === "myMeetings" && "active font-bold"}`}
        onClick={() => setActiveTab("myMeetings")}
      >
        나의 모임
      </button>
      <button
        className={`color-gray01 relative pb-[25px] text-[18px] max-989:pb-[15px] max-989:text-[16px] max-767:pb-[10px] max-767:text-[14px] ${activeTab === "campingReviews" && "active font-bold"}`}
        onClick={() => setActiveTab("campingReviews")}
      >
        캠핑후기
      </button>
      <button
        className={`color-gray01 relative pb-[25px] text-[18px] max-989:pb-[15px] max-989:text-[16px] max-767:pb-[10px] max-767:text-[14px] ${activeTab === "calendar" && "active font-bold"}`}
        onClick={() => setActiveTab("calendar")}
      >
        캘린더
      </button>
      <button
        className={`color-gray01 relative pb-[25px] text-[18px] max-989:pb-[15px] max-989:text-[16px] max-767:pb-[10px] max-767:text-[14px] ${activeTab === "Likes" && "active font-bold"}`}
        onClick={() => setActiveTab("Likes")}
      >
        좋아요
      </button>
      <button
        className={`color-gray01 relative pb-[25px] text-[18px] max-989:pb-[15px] max-989:text-[16px] max-767:pb-[10px] max-767:text-[14px] ${activeTab === "followers" && "active font-bold"}`}
        onClick={() => setActiveTab("followers")}
      >
        팔로워
      </button>
    </div>
  );
};

export default TabList;
