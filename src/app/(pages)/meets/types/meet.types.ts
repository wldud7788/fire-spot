import { CampFromDB } from "./camp.types";

export interface MeetWithCamp {
  meet: MeetResponse;
  camp: CampFromDB;
}

// export interface Meet extends Camp {
export interface MeetResponse {
  id: number;
  user_id: string;
  contentId: number;
  title: string;
  content: string;
  supplies: string[]; // [ '텐트', '생수', '콘센트', '음식', '침낭' . . . ],
  start_date: string;
  end_date: string;
  is_end: boolean;
  is_day_trip: boolean;
  created_at: string;
  deadline_headcount: number;
  deadline_date: string | null;
  attendee_count: number;
}

export interface MeetForm {
  contentId: string;
  title: string;
  content: string;
  supplies: string[];
  start_date: string | Date;
  end_date: string | Date;
  is_day_trip: boolean;
  is_newbie: boolean;
  deadline_headcount: number;
  deadline_date: string | null;
}
