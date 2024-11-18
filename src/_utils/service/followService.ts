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

export const getFollowerData = async (userId: string | "") => {
  const { data: followers } = await supabase
    .from("follows")
    .select(`*`)
    .eq(`follower_id`, userId);
  return followers;
};

export const getFollowingData = async (userId: string | "") => {
  const { data: followings } = await supabase
    .from("follows")
    .select(`*`)
    .eq("following_id", userId);

  return followings;
};

export const getUserProfile = async (userId: string) => {
  const { data: userProfile, error } = await supabase
    .from("profile")
    .select(`*`)
    .eq("id", userId)
    .single();

  if (error) {
    return;
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

export const followUser = async (loginUserId: string, followUserId: string) => {
  try {
    // 팔로우 추가
    const { data, error } = await supabase
      .from("follows")
      .insert([{ follower_id: loginUserId, following_id: followUserId }]);

    if (error) {
      throw new Error(error.message);
    }
    return data; // 성공적으로 팔로우가 추가되면 데이터를 반환
  } catch (error) {
    console.error("팔로우 실패:", error);
    throw error;
  }
};

export const unfollowUser = async (
  loginUserId: string,
  followUserId: string
) => {
  try {
    // 팔로우 취소
    const { data, error } = await supabase
      .from("follows")
      .delete()
      .eq("follower_id", loginUserId)
      .eq("following_id", followUserId);

    if (error) {
      throw new Error(error.message);
    }
    return data; // 성공적으로 팔로우가 취소되면 데이터를 반환
  } catch (error) {
    console.error("팔로우 취소 실패:", error);
    throw error;
  }
};

export const fetchBookmarks = async () => {
  const {
    data: { session }
  } = await supabase.auth.getSession();
  if (!session) {
    return;
  }
  const { data, error } = await supabase
    .from("bookmarks")
    .select("*")
    .eq("userId", session.user.id);
  return data;
};
