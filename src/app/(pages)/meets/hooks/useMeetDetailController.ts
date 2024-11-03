"use client";
import { getUser } from "@/_utils/auth";
import { useEffect, useState } from "react";
import { getAttendeeList } from "../actions/meetDetailAction";
import { MeetAttendeeSelect, MeetWithCamp } from "../types/meet.types";
import {
  deleteMeetAttendee,
  postMeetAttendee
} from "../actions/meetAttendAction";
import useAttendButtonState from "./useAttendButtonState";
import { startOfDay, subDays } from "date-fns";
import { DEADLINE_APPROACHING } from "@/_utils/common/constant";
import { useRouter } from "next/navigation";

export interface ButtonConfig {
  text: string;
  className: string;
  onClick: (meetId?: number | string) => void;
  disabled: boolean;
}

const useMeetDetailController = (meetWithCamp: MeetWithCamp) => {
  const [attendeeId, setAttendeeId] = useState<number>(0);
  const [userId, setUserId] = useState("load");
  const [attendeeList, setAttendeeList] = useState<MeetAttendeeSelect[]>([]);
  const { meet, camp, attendee_count } = meetWithCamp;
  const router = useRouter();
  /** user, attendee 패칭 */
  const fetchData = async () => {
    const userPromise = getUser();
    const attendeePromise = getAttendeeList(meet.id ?? 0);

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
    const attendee: MeetAttendeeSelect = await postMeetAttendee(
      meetWithCamp.meet.id ?? 0
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

  const buttonType = useAttendButtonState(
    isLoad,
    isUser,
    isOwner,
    isDeadline,
    !!attendeeId
  );

  const buttonConfig: ButtonConfig = {
    text: "",
    className: "bg-[#D9D9D9]",
    onClick: () => {},
    disabled: true
  };

  // TODO confirm, alert 사카모토
  if (buttonType === "post") {
    buttonConfig.text = "신청하기";
    buttonConfig.className = "bg-[#D9D9D9]";
    buttonConfig.onClick = handleAttendPost;
    buttonConfig.disabled = false;
  } else if (buttonType === "hasAttended") {
    buttonConfig.text = "신청취소";
    buttonConfig.className = "bg-[#D9D9D9]";
    buttonConfig.onClick = handleAttendDelete;
    buttonConfig.disabled = false;
  } else if (buttonType === "isDeadline") {
    buttonConfig.text = "신청마감";
    buttonConfig.className = "bg-[#D9D9D9]";
    buttonConfig.disabled = true;
  } else if (buttonType === "delete") {
    buttonConfig.text = "수정하기";
    buttonConfig.className = "bg-[#D9D9D9]";
    buttonConfig.onClick = (meetId: string | number | undefined) => {
      router.push("/meets/edit/" + meetId);
    };
    buttonConfig.disabled = false;
  } else if (buttonType === "skelton") {
    buttonConfig.text = "신청하기";
    buttonConfig.className = "bg-[#D9D9D9]";
    buttonConfig.disabled = true;
  } else if (buttonType === "notLoggedIn") {
    buttonConfig.text = "신청하기";
    buttonConfig.className = "bg-[#D9D9D9]";
    buttonConfig.onClick = () => {
      alert("로그인 한 유저만 가능합니다.");
    };
    buttonConfig.disabled = false;
  }

  return {
    buttonConfig
  };
};

export default useMeetDetailController;
