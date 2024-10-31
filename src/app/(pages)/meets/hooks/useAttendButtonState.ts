import { useState } from "react";

type ButtonState = {
  text: string;
  type: "post" | "delete" | "notLoggedIn" | "deadline" | "skelton";
  enabled: boolean;
};

const buttonStates: Record<string, ButtonState> = {
  enable: { text: "신청 하기", type: "post", enabled: true },
  hasAttended: { text: "신청 취소", type: "delete", enabled: true },
  isDeadline: { text: "신청 마감", type: "deadline", enabled: false },
  notLoggedIn: { text: "신청 하기", type: "notLoggedIn", enabled: true },
  skelton: { text: "", type: "skelton", enabled: false }
};

/** 버튼 상태 가져오는 함수. type에 따라 css와 이벤트핸들러 다르게 정의 */
const useAttendButtonState = (
  isLoad: boolean,
  isUser: boolean,
  isDeadline: boolean,
  hasAttended: boolean
) => {
  console.log("isDeadline", isDeadline);
  if (isLoad) return buttonStates.skelton;
  if (isDeadline) return buttonStates.isDeadline;
  if (!isUser) return buttonStates.notLoggedIn;
  if (hasAttended) return buttonStates.hasAttended;
  return buttonStates.enable;
};

export default useAttendButtonState;