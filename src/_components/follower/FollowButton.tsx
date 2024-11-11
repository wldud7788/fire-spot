"use client";

import {
  followUser,
  getFollowerData,
  unfollowUser
  // getFollowingData
} from "@/_utils/service/followService";
import {
  useMutation,
  useQueryClient,
  useSuspenseQuery
} from "@tanstack/react-query";

import {
  QK_FOLLOWERS,
  QK_FOLLOWER_USER_PROFILE,
  QK_FOLLOWINGS,
  QK_FOLLOWING_USER_PROFILE
} from "@/_utils/api/queryKeys/followQueryKeys";

type FollowButtonProps = {
  loginUserId: string;
  followUserId: string;
  type: string;
};

const FollowButton = ({
  loginUserId,
  followUserId,
  type
}: FollowButtonProps) => {
  const queryClient = useQueryClient();
  const { data: followers, isError: followersError } = useSuspenseQuery({
    queryKey: QK_FOLLOWERS(loginUserId),
    queryFn: () => getFollowerData(loginUserId),
    staleTime: 0
  });

  const followMutation = useMutation({
    mutationFn: () => followUser(loginUserId, followUserId),
    onSuccess: () => {
      const queryKeys = [
        QK_FOLLOWERS(loginUserId),
        QK_FOLLOWINGS(loginUserId),
        QK_FOLLOWER_USER_PROFILE(followUserId),
        QK_FOLLOWING_USER_PROFILE(followUserId)
      ];
      queryKeys.forEach((key) =>
        queryClient.invalidateQueries({ queryKey: key })
      );
    }
  });

  const unfollowMutation = useMutation({
    mutationFn: () => unfollowUser(loginUserId, followUserId),
    onSuccess: () => {
      const queryKeys = [
        QK_FOLLOWERS(loginUserId),
        QK_FOLLOWINGS(loginUserId),
        QK_FOLLOWER_USER_PROFILE(followUserId),
        QK_FOLLOWING_USER_PROFILE(followUserId)
      ];
      queryKeys.forEach((key) =>
        queryClient.invalidateQueries({ queryKey: key })
      );
    }
  });

  if (followersError) return <div>에러가 노출되었습니다.</div>;
  console.log("followers ==>", followers);

  const isFollow = followers?.some(
    (following) => following.following_id === followUserId
  );

  if (!loginUserId) return <p>팔로우는 회원만 가능합니다.</p>;

  return (
    <>
      {followUserId === loginUserId ? null : (
        <>
          {isFollow ? (
            <button
              className="bd-color-sub w-full rounded-[8px] border border-[#ffd0b2] bg-[#FFD0B2] py-[5px] text-[12px] text-[#803200]"
              onClick={() => unfollowMutation.mutate()}
            >
              언팔로우
            </button>
          ) : (
            <button
              className="w-full rounded-[8px] border border-[#FFD0B2] py-[5px] text-[12px] text-[#803200]"
              onClick={() => followMutation.mutate()}
            >
              팔로우
            </button>
          )}
        </>
      )}
    </>
  );
};

export default FollowButton;
