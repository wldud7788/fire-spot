"use client";
import React from "react";
interface TabListProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const TabList: React.FC<TabListProps> = ({ activeTab, setActiveTab }) => {
  return (
    <div>
      <button onClick={() => setActiveTab("myMeetings")}>나의 모임</button>
      <button onClick={() => setActiveTab("campingReviews")}>캠핑후기</button>
      <button onClick={() => setActiveTab("calendar")}>캘린더</button>
      <button onClick={() => setActiveTab("bookmarks")}>북마크</button>
      <button onClick={() => setActiveTab("followers")}>팔로워</button>
    </div>
  );
};

export default TabList;
