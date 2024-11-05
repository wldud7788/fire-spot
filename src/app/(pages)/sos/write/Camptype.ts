import { Database } from "../../../../../database.types";

export type CampSelect = Database["public"]["Tables"]["camp"]["Row"];
export type CampInsert = Database["public"]["Tables"]["camp"]["Insert"];

export interface MeetWithCamp {
  camp: CampSelect;
}
