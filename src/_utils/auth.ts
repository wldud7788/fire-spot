import { User } from "@supabase/supabase-js";
import { createClient } from "./supabase/client";
import { getUserProfile } from "./service/followService";
import {
  ProfileSelect,
  UserWithProfile
} from "@/_components/chat/types/Profile.types";

const supabase = createClient();

export const getUser = async (): Promise<User | null> => {
  const {
    data: { user }
  } = await supabase.auth.getUser();
  return user;
};

export const getUserWithProfile = async (): Promise<UserWithProfile | null> => {
  const {
    data: { user }
  } = await supabase.auth.getUser();

  const profile = await getUserProfile(user?.id || "");

  const userWithProfile: UserWithProfile = {
    user: user,
    profile: profile
  };

  return userWithProfile;

  // return user;
};

export const signOut = async (): Promise<void> => {
  await supabase.auth.signOut();
};
