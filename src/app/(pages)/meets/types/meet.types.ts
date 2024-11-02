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

// export interface Meet extends Camp {
// export interface MeetResponse {
//   id: number;
//   user_id: string;
//   contentId: number;
//   title: string;
//   content: string;
//   supplies: string[]; // [ '텐트', '생수', '콘센트', '음식', '침낭' . . . ],
//   start_date: Date;
//   end_date: Date;
//   is_end: boolean;
//   is_day_trip: boolean;
//   is_newbie: boolean;
//   ground_type: string;
//   deadline_headcount: number;
//   deadline_date: string | null;
//   attendee_count: number;
//   created_at?: string;
// }

export type MeetSelect = Database["public"]["Tables"]["meet"]["Row"];

export type MeetInsert = Database["public"]["Tables"]["meet"]["Insert"];

export type MeetUpdate = Database["public"]["Tables"]["meet"]["Update"];

export type MeetAttendeeSelect =
  Database["public"]["Tables"]["meet_attendee"]["Row"];
// {
//   id: number;
//   meet_id: number;
//   user_id: string;
//   created_at: Date;
// }

export interface MeetCard {
  id: number;
  title: string;
  date: string; // 시작일?
  deadline_headcount: number; // 마감인원
  tags: string[]; // 마감임박, 글램핑, 초보가능 . . .
  location: string | null; // 지역
  attendee_count: number; //참여자 수
}
