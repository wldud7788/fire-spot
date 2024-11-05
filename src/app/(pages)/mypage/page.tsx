"use client";

import React, { useState } from "react";
import TabList from "./TabList";
import MeetList from "./MeetList";
import CampingReviews from "./CampingReviews";
import Calendar from "./Calendar";
import Bookmarks from "./Bookmarks";
import Followers from "./Followers";
import UserCard from "./UserCard";

const MyPage = () => {
  const [activeTab, setActiveTab] = useState("myMeetings");

  return (
    <div>
      <UserCard />
      <TabList activeTab={activeTab} setActiveTab={setActiveTab} />
      {activeTab === "myMeetings" && <MeetList />}
      {activeTab === "campingReviews" && <CampingReviews />}
      {activeTab === "calendar" && <Calendar />}
      {activeTab === "bookmarks" && <Bookmarks />}
      {activeTab === "followers" && <Followers />}
    </div>
  );
};

export default MyPage;
