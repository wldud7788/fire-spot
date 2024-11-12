import { Database } from "../../../../../database.types";
import { CampSelect } from "../../meets/types/camp.types";

export type SosWithCamp = {
  sos: SosSelect;
  camp: CampSelect;
};

export const SOS_TYPE = {
  emergency: "긴급",
  asking: "캠핑질문",
  lost: "분실/실종",
  tidings: "공공소식",
  help: "도움요청"
} as const;

export type SosTypeType = keyof typeof SOS_TYPE;

export type SosSelect = Database["public"]["Tables"]["sos"]["Row"];
export type SosInsert = Database["public"]["Tables"]["sos"]["Insert"];
export type SosUpdate = Database["public"]["Tables"]["sos"]["Update"];
