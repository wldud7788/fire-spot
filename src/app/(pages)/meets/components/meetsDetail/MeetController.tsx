"use client";
import React, { useEffect, useState } from "react";
import { MeetAttendeeResponse, MeetWithCamp } from "../../types/meet.types";
import MeetContentSection from "./MeetContentSection";
import MeetTitleSection from "./MeetTitleSection";
import MeetIntroSection from "./MeetIntroSection";
import MeetSuppliesSection from "./MeetSuppliesSection";
import MeetRecommendSection from "./MeetRecommendSection";
import { User } from "@supabase/supabase-js";
import { getUser } from "@/_utils/auth";
import { getAttendeeList } from "../../actions/meetDetailAction";

type Props = {
  meetWithCamp: MeetWithCamp;
};
const MeetController = ({ meetWithCamp }: Props) => {
  const [userId, setUserId] = useState("");
  const [attendeeList, setAttendeeList] = useState<MeetAttendeeResponse[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const userPromise = getUser();
      const attendeePromise = getAttendeeList(meetWithCamp.meet.id);

      const [user, attendee] = await Promise.all([
        userPromise,
        attendeePromise
      ]);

      setUserId(user?.id || "");
      setAttendeeList(attendee);
    };

    fetchData();
  }, []);

  const isUser = !!userId;
  const isOwner = meetWithCamp.meet.user_id === userId;
  const isDeadline = meetWithCamp.meet.start_date <= new Date();
  const hasAttended = attendeeList.some(
    (attendee) => attendee.user_id === userId
  );

  const isAttendButtonVisible = !isOwner;

  return (
    <div className="mx-auto w-full">
      <MeetTitleSection meetWithCamp={meetWithCamp} />
      <MeetIntroSection meetWithCamp={meetWithCamp} />
      <MeetContentSection meetWithCamp={meetWithCamp} />
      <MeetSuppliesSection meetWithCamp={meetWithCamp} />
      <MeetRecommendSection />
    </div>
  );
};

export default MeetController;
