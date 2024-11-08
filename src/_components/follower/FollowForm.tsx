"use client";
import {
  getFollowerData,
  getFollowingData,
  getUserProfileAll
} from "@/_utils/service/followService";
import { useSuspenseQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import FollowCard from "./FollowCard";
import {
  QK_FOLLOWER_USER_PROFILE,
  QK_FOLLOWING_USER_PROFILE,
  QK_USER_PROFILE_ALL
} from "@/_utils/api/queryKeys/followQueryKeys";

type FollowFormProps = {
  loginUserId: string;
  profileUser: string;
};

const FollowForm = ({ loginUserId, profileUser }: FollowFormProps) => {
  const [isFollower, setIsFollower] = useState(true);

  const { data: follower, isError: followerError } = useSuspenseQuery({
    queryKey: QK_FOLLOWER_USER_PROFILE(profileUser),
    queryFn: () => getFollowerData(profileUser),
    staleTime: 0
  });

  const { data: following, isError: followingError } = useSuspenseQuery({
    queryKey: QK_FOLLOWING_USER_PROFILE(profileUser),
    queryFn: () => getFollowingData(profileUser),
    staleTime: 0
  });

  // 유저 프로필을 가져오는 쿼리
  const { data: userProfileAll } = useSuspenseQuery({
    queryKey: QK_USER_PROFILE_ALL(profileUser),
    queryFn: () => getUserProfileAll(),
    staleTime: 0
  });

  const followerUser = follower?.map((user) => user.following_id) || [];
  const followingUser = following?.map((user) => user.follower_id) || [];

  const matchingFollowerProfiles = userProfileAll?.filter((profile) =>
    followerUser.includes(profile.id)
  );
  const matchingFollowingProfiles = userProfileAll?.filter((profile) =>
    followingUser.includes(profile.id)
  );

  if (followerError) return <div>팔로워 에러</div>;
  if (followingError) return <div>팔로잉 에러</div>;

  return (
    <div className="follow_form">
      <ul>
        <li>
          <button onClick={() => setIsFollower(true)}>팔로워보기</button>
        </li>
        <li>
          <button onClick={() => setIsFollower(false)}>팔로잉보기</button>
        </li>
      </ul>
      <ul>
        {isFollower ? (
          <>
            {/* 팔로워 */}
            {matchingFollowingProfiles?.map((profile) => {
              return (
                <li key={profile.id}>
                  <FollowCard loginUserId={loginUserId} profile={profile} />
                </li>
              );
            })}
          </>
        ) : (
          <>
            {/* 팔로잉 */}
            {matchingFollowerProfiles?.map((profile) => {
              return (
                <li key={profile.id}>
                  <FollowCard loginUserId={loginUserId} profile={profile} />
                </li>
              );
            })}
          </>
        )}
      </ul>
    </div>
  );
};

export default FollowForm;
