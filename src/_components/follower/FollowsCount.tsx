import React from "react";

type FollowsCountProps = {
  followerCount: number | undefined;
  followingCount: number | undefined;
};

const FollowsCount = ({ followerCount, followingCount }: FollowsCountProps) => {
  return (
    <ul className="mb-[24px] flex items-center justify-center">
      <li className="li-before-line relative mr-[13px] pr-[13px]">
        팔로워 {followerCount}
      </li>
      <li>팔로잉 {followingCount}</li>
    </ul>
  );
};

export default FollowsCount;
