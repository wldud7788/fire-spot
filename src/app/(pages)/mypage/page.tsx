"use client";

import React, { useState } from "react";
import TabList from "./TabList";
import MeetList from "./MeetList";
import CampingReviews from "./CampingReviews";
import Calendar from "./Calendar";
import Followers from "./Followers";
import UserCard from "./UserCard";
import Likes from "./Likes";

const MyPage = () => {
  const [activeTab, setActiveTab] = useState("myMeetings");

  return (
    <div className="my_page my-[60px]">
      <div className="inner m-auto w-full max-w-[1360px] px-[30px]">
        <div className="tab_list">
          <TabList activeTab={activeTab} setActiveTab={setActiveTab} />
        </div>
        <div className="flex gap-[40px]">
          <div className="w-[320px]">
            <UserCard />
          </div>
          <div className="cont w-full max-w-[calc(100%-360px)]">
            {activeTab === "myMeetings" && <MeetList />}
            {activeTab === "campingReviews" && <CampingReviews />}
            {activeTab === "calendar" && <Calendar />}
            {activeTab === "Likes" && <Likes />}
            {activeTab === "followers" && <Followers />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyPage;
