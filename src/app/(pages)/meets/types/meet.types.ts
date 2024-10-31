import { CampFromDB } from "./camp.types";

export interface MeetWithCamp {
  meet: MeetResponse;
  camp: CampFromDB;
  attendee_count: number;
}

// export interface Meet extends Camp {
export interface MeetResponse {
  id: number;
  user_id: string;
  contentId: number;
  title: string;
  content: string;
  supplies: string[]; // [ '텐트', '생수', '콘센트', '음식', '침낭' . . . ],
  start_date: Date;
  end_date: Date;
  is_end: boolean;
  is_day_trip: boolean;
  is_newbie: boolean;
  created_at: string;
  deadline_headcount: number;
  deadline_date: string | null;
  attendee_count: number;
}

export interface MeetForm {
  contentId: string | number;
  title: string;
  content: string;
  supplies: string[];
  start_date: Date;
  end_date: string | Date;
  is_day_trip: boolean;
  is_newbie: boolean | string;
  deadline_headcount: number;
  deadline_date: string | null;
}

export interface MeetAttendeeResponse {
  id: number;
  meet_id: number;
  user_id: string;
  created_at: Date;
}

export interface MeetCard {
  id: number;
  title: string;
  tags: string[]; // 마감임박, 글램핑, 초보가능 . . .
  location: string; // 지역
  date: string; // 시작일?
  attendee_count: number; //참여자 수
  deadline_headcount: number; // 마감인원
}
