import { Camp } from "./camp.types";

export interface Meet {
  id: number;
  user_id: string;
  camp_id: number;
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
  camp: Camp;
}
