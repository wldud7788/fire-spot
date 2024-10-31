export type ButtonType =
  | "post"
  | "hasAttended"
  | "isDeadline"
  | "delete"
  | "notLoggedIn"
  | "skelton";

type ButtonState = {
  post: "post";
  hasAttended: "hasAttended";
  isDeadline: "isDeadline";
  delete: "delete";
  notLoggedIn: "notLoggedIn";
  skelton: "skelton";
};

const buttonStates: ButtonState = {
  post: "post",
  hasAttended: "hasAttended",
  isDeadline: "isDeadline",
  delete: "delete",
  notLoggedIn: "notLoggedIn",
  skelton: "skelton"
} as const;

/** 버튼 상태 가져오는 함수. type에 따라 css와 이벤트핸들러 다르게 정의 */
const useAttendButtonState = (
  isLoad: boolean,
  isUser: boolean,
  isOwner: boolean,
  isDeadline: boolean,
  hasAttended: boolean
): ButtonType => {
  if (isLoad) return buttonStates.skelton;
  if (isDeadline) return buttonStates.isDeadline;
  if (!isUser) return buttonStates.notLoggedIn;
  if (isOwner) return buttonStates.delete;
  if (hasAttended) return buttonStates.hasAttended;
  return buttonStates.post;
};

export default useAttendButtonState;
