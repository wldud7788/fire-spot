"use client";
import { getUser } from "@/_utils/auth";
import { useEffect, useState } from "react";
import { getAttendeeList } from "../actions/meetDetailAction";
import { MeetAttendeeResponse, MeetWithCamp } from "../types/meet.types";
import {
  deleteMeetAttendee,
  postMeetAttendee
} from "../actions/meetAttendAction";
import useAttendButtonState from "./useAttendButtonState";
import { startOfDay, subDays } from "date-fns";
import { DEADLINE_APPROACHING } from "@/_utils/common/constant";

const useMeetController = (meetWithCamp: MeetWithCamp) => {
  const [attendeeId, setAttendeeId] = useState<number>(0);
  const [userId, setUserId] = useState("load");
  const [attendeeList, setAttendeeList] = useState<MeetAttendeeResponse[]>([]);
  const { meet, camp, attendee_count } = meetWithCamp;

  /** user, attendee 패칭 */
  const fetchData = async () => {
    const userPromise = getUser();
    const attendeePromise = getAttendeeList(meet.id);

    const [user, attendee] = await Promise.all([userPromise, attendeePromise]);

    setUserId(user?.id || "");
    setAttendeeList(attendee);
  };

  /** 마운트시 fetchDate() 호출 */
  useEffect(() => {
    fetchData();
  }, []);

  /** attendeeList, userId 변경 시 attendeeId 재설정 */
  useEffect(() => {
    const attendee = attendeeList.find(
      (attendee) => attendee.user_id === userId
    );

    setAttendeeId(attendee?.id || 0);
  }, [attendeeList, userId]);

  /** 신청하기 버튼 클릭 함수 */
  const handleAttendPost = async () => {
    const attendee: MeetAttendeeResponse = await postMeetAttendee(
      meetWithCamp.meet.id
    );
    setAttendeeId(attendee.id);
    await fetchData();
  };

  /** 신청취소 버튼 클릭 함수 */
  const handleAttendDelete = async () => {
    await deleteMeetAttendee(attendeeId);
    setAttendeeId(0);
    await fetchData();
  };

  const isOwner = meet.user_id === userId; // 작성자인지
  const isLoad = userId === "load"; // fetchData() 비동기 요청이 진행중인지

  const isUser = !!userId; // 사용자가 로그인 했는지

  // 마감 여부 일자 또는 인원수
  const isDeadlineByDate =
    startOfDay(meet.start_date) <= startOfDay(new Date());
  const isDeadlineByHeadcount = meet.deadline_headcount <= attendee_count;
  const isDeadline = isDeadlineByDate || isDeadlineByHeadcount;

  // 마감 임박 (당장 쓸 필요 X)
  const isDeadlineApproaching =
    subDays(startOfDay(meetWithCamp.meet.start_date), DEADLINE_APPROACHING) <=
    new Date();

  const isAttendButtonVisible = !isOwner; // 작성자면 버튼이 안보여야함

  const buttonState = useAttendButtonState(
    isLoad,
    isUser,
    isOwner,
    isDeadline,
    !!attendeeId
  );

  return {
    buttonState,
    handleAttendPost,
    handleAttendDelete
  };
};

export default useMeetController;
