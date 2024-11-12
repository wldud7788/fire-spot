import { SOS_TYPE, SosSelect } from "../types/sos.types";

export const sosFormDefaultValues: SosSelect = {
  id: 0,
  contentId: 0,
  title: "",
  content: "",
  type: "help",
  tag: [],
  created_at: new Date().toISOString()
};
