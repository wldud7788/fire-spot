"use client";
import {
  getFollowerData,
  getFollowingData,
  getUserProfileAll
} from "@/_utils/service/followService";
import { useQuery, useSuspenseQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import FollowCard from "./FollowCard";

type flowFormProps = {
  loginUserId: string;
  profileUser: string;
};

const FollowForm = ({ loginUserId, profileUser }: flowFormProps) => {
  const [isFollower, setIsFollower] = useState(true);

  const {
    data: follower,
    isLoading: followerLoading,
    isError: followerError
  } = useSuspenseQuery({
    queryKey: ["profileUserFollower", profileUser],
    queryFn: () => getFollowerData(profileUser),
    staleTime: 0
  });

  const {
    data: following,
    isLoading: followingLoading,
    isError: followingError
  } = useSuspenseQuery({
    queryKey: ["profileUserFollowing", profileUser],
    queryFn: () => getFollowingData(profileUser),
    staleTime: 0
  });

  // 유저 프로필을 가져오는 쿼리
  const {
    data: userProfileAll,
    isLoading: userProfileAllLoading,
    isError: userProfileAllError
  } = useSuspenseQuery({
    queryKey: ["userProfileAll", profileUser],
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

  if (followerLoading) return <div>팔로워 로딩중</div>;
  if (followerError) return <div>팔로워 에러</div>;
  if (followingLoading) return <div>팔로잉 로딩중</div>;
  if (followingError) return <div>팔로잉 에러</div>;
  if (userProfileAllLoading) return <div>프로필 로딩중</div>;
  if (userProfileAllError) return <div>프로필 에러</div>;

  console.log(
    loginUserId,
    profileUser,
    "followerUser ==>",
    followerUser,
    "followingUser ==>",
    followingUser,
    "matchingFollowerProfiles",
    matchingFollowerProfiles,
    "matchingFollowingProfiles",
    matchingFollowingProfiles
  );

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
            {matchingFollowerProfiles?.map((profile) => {
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
            {matchingFollowingProfiles?.map((profile) => {
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
