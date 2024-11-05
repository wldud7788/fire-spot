"use client";
import Calendar from "@/_components/calendar/Calendar";
import React from "react";
import CalendarFooter from "./CalendarFooter";
const CalendarPage = () => {
  return (
    <div>
      <Calendar />
      <CalendarFooter />
    </div>
  );
};

export default CalendarPage;
