import { User } from "@supabase/supabase-js";
import { Database } from "../../../../database.types";

export type UserWithProfile = {
  user: User | null;
  profile?: ProfileSelect;
};

export type ProfileSelect = Database["public"]["Tables"]["profile"]["Row"];
