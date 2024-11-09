import { MeetSelect } from "@/app/(pages)/meets/types/meet.types";
import { Database } from "../../../../database.types";
import { ProfileSelect } from "./Profile.types";

export type ChatRoomInfo = {
  chatAttendee: ChatAttendeeSelect;
  chatRoom: ChatRoomSelect;
  chatMessage: ChatMessageSelect;
  profile: ProfileSelect;
  meet: MeetSelect;
  headcount: number;
};

export type ChatRoomTitle = {
  chatRoom: ChatRoomSelect;
  meet: MeetSelect;
  headcount: number;
};

export type ChatRoomMessageInfo = {
  chatMessage: ChatMessageSelect;
  profile: ProfileSelect;
  headcount: number;
};

export type ChatMessageSelect =
  Database["public"]["Tables"]["chat_message"]["Row"];
export type ChatMessageInsert =
  Database["public"]["Tables"]["chat_message"]["Insert"];

export type ChatAttendeeSelect =
  Database["public"]["Tables"]["chat_attendee"]["Row"];
export type ChatAttendeeInsert =
  Database["public"]["Tables"]["chat_attendee"]["Insert"];

export type ChatRoomSelect = Database["public"]["Tables"]["chat_room"]["Row"];
export type ChatRoomInsert =
  Database["public"]["Tables"]["chat_room"]["Insert"];

/**
 * TO: 튜터님 ChatRoomType 에 대해 궁금한게 있슴니다.
 *
 * TODO: TS 프로젝트를 진행하다 보면 이렇게 자잘한 string 타입을 지정해주어야할 때가 있는데,
 * 이런 것도 string을 이렇게 하드코딩 하지 않고, 객체나 enum을 사용하는게 좋을까요?
 *
 * ex)
 * const CHAT_ROOM_TYPE = {
 *   meet:"meet",
 *   sos: "sos",
 * }
 *
 * type ChatRoomType = keyof typeof CHAT_ROOM_TYPE
 *
 * */
export type ChatRoomType = "meet" | "sos";
