import React from "react";

type FollowsCountProps = {
  followerCount: number | undefined;
  followingCount: number | undefined;
};

const FollowsCount = ({ followerCount, followingCount }: FollowsCountProps) => {
  return (
    <ul className="flex">
      <li>팔로워 {followerCount}</li>
      <li>팔로잉 {followingCount}</li>
    </ul>
  );
};

export default FollowsCount;
