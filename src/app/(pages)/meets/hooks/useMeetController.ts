"use client";
import { getUser } from "@/_utils/auth";
import { useEffect, useState } from "react";
import { getAttendeeList } from "../actions/meetDetailAction";
import { MeetAttendeeResponse, MeetWithCamp } from "../types/meet.types";

const useMeetController = (meetWithCamp: MeetWithCamp) => {
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

  const isOwner = meetWithCamp.meet.user_id === userId;
  const isLoad = userId === "";

  const isUser = !!userId;
  const isDeadline = meetWithCamp.meet.start_date <= new Date();
  const hasAttended = attendeeList.some(
    (attendee) => attendee.user_id === userId
  );

  const isAttendButtonVisible = !isOwner;
  const buttonState = getButtonState(isLoad, isUser, isDeadline, hasAttended);

  const attendButtonValid = { isAttendButtonVisible, buttonState };

  return attendButtonValid;
};

const buttonStates = {
  hasAttended: { text: "신청 완료", type: "completed" },
  isDeadline: { text: "신청 마감", type: "deadline" },
  enable: { text: "신청 하기", type: "enabled" },
  notLoggedIn: { text: "신청 하기", type: "notLoggedIn" },
  skelton: { text: "", type: "skelton" }
};

const getButtonState = (
  isLoad: boolean,
  isUser: boolean,
  isDeadline: boolean,
  hasAttended: boolean
) => {
  if (isLoad) return buttonStates.skelton;

  if (!isUser) return buttonStates.notLoggedIn;

  if (hasAttended) return buttonStates.hasAttended;

  if (isDeadline) return buttonStates.isDeadline;

  return buttonStates.enable;
};

export default useMeetController;
