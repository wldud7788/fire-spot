import { createClient } from "../supabase/client";

const supabase = createClient();

export const getFollowsData = async () => {
  const { data: followsData, error } = await supabase
    .from("follows")
    .select(`*`);

  if (error) {
    throw new Error(error.message);
  }
  return followsData;
};

export const getFollowerData = async (userId: string) => {
  const { data: followers } = await supabase
    .from("follows")
    .select(`*`)
    .eq(`follower_id`, userId);
  return followers;
};

export const getFollowingData = async (userId: string) => {
  const { data: followings } = await supabase
    .from("follows")
    .select(`*`)
    .eq("following_id", userId);

  console.log("Following data:", followings);

  return followings;
};

export const getUserProfile = async (userId: string) => {
  const { data: userProfile, error } = await supabase
    .from("profile")
    .select(`*`)
    .eq("id", userId)
    .single();

  if (error) {
    throw new Error(error.message);
  }
  return userProfile;
};

export const getUserProfileAll = async () => {
  const { data: userProfileAll, error } = await supabase
    .from("profile")
    .select(`*`);

  if (error) {
    throw new Error(error.message);
  }
  return userProfileAll;
};
