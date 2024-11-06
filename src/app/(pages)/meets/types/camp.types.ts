import { Database } from "../../../../../database.types";

export type CampInsert = Database["public"]["Tables"]["camp"]["Insert"];
export type CampSelect = Database["public"]["Tables"]["camp"]["Row"];

export interface CampImageList {
  imageUrl: string;
  contentId: string;
  serialnum: string;
  createdtime: string;
  modifiedtime: string;
}
