"use client";
import React from "react";
import { useMeetList } from "./hooks/useMeetList";
const MeetList = () => {
  const { meets } = useMeetList();

  // console.log("meetAttendee", meets);

  return (
    <ul>
      {meets.map((meet) => (
        // <li></li>
        <></>
      ))}
    </ul>
  );
};

export default MeetList;
