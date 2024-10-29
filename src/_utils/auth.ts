import { User } from "@supabase/supabase-js";
import { createClient } from "./supabase/client";

const supabase = createClient();

export const getUser = async (): Promise<User | null> => {
  const {
    data: { user }
  } = await supabase.auth.getUser();
  return user;
};

export const signOut = async (): Promise<void> => {
  await supabase.auth.signOut();
};
