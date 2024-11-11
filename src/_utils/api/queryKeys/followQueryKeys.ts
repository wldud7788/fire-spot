export const QK_USER_PROFILE_ALL = (profileUser: string | null) => [
  "userProfileAll",
  profileUser
];
export const QK_FOLLOWER_USER_PROFILE = (followUserId: string | null) => [
  "profileUserFollower",
  followUserId
];
export const QK_FOLLOWING_USER_PROFILE = (followUserId: string | null) => [
  "profileUserFollowing",
  followUserId
];
export const QK_FOLLOWERS = (loginUserId: string | null) => [
  "followers",
  loginUserId
];
export const QK_FOLLOWINGS = (loginUserId: string | null) => [
  "followings",
  loginUserId
];
