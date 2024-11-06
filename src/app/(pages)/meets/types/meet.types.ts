import { Database } from "../../../../../database.types";
import { CampInsert, CampSelect } from "./camp.types";

export interface MeetWithCamp {
  meet: MeetSelect;
  camp: CampSelect;
  attendee_count: number;
}

export interface MeetWithCampInsert {
  meet: MeetInsert;
  camp: CampInsert;
  attendee_count: number;
}

export type MeetSelect = Database["public"]["Tables"]["meet"]["Row"];

export type MeetInsert = Database["public"]["Tables"]["meet"]["Insert"];

export type MeetUpdate = Database["public"]["Tables"]["meet"]["Update"];

export type MeetAttendeeSelect =
  Database["public"]["Tables"]["meet_attendee"]["Row"];

export interface MeetCard {
  id: number;
  title: string;
  date: string; // 시작일?
  deadline_headcount: number; // 마감인원
  tags: string[]; // 마감임박, 글램핑, 초보가능 . . .
  location: string | null; // 지역
  attendee_count: number; //참여자 수
  isDeadlineApproaching: boolean; // 마감 임박
  isDeadline: boolean; // 마감
}
