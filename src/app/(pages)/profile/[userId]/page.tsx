"use client";

import FollowButton from "@/_components/follower/FollowButton";
import FollowForm from "@/_components/follower/FollowForm";
import { getUser } from "@/_utils/auth";
import { getUserProfile } from "@/_utils/service/followService";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";

type ProfilePageProps = {
  params: {
    userId: string;
  };
};

const ProfilePage = ({ params }: ProfilePageProps) => {
  // 클릭한 유저의 프로필
  const [loginUserId, setLoginUserId] = useState("");
  const [profileUser] = useState(params.userId);

  useEffect(() => {
    const getLoginUserId = async () => {
      const getUserId = await getUser();
      if (!getUserId) return <div>유저 정보를 가져오지 못했습니다.</div>;

      setLoginUserId(getUserId.id);
    };
    getLoginUserId();
  }, []);

  const { data: userProfile, isError: userProfileError } = useQuery({
    queryKey: ["profile", profileUser],
    queryFn: () => getUserProfile(profileUser)
  });

  if (!userProfile) return <>로딩중</>;
  if (userProfileError) return <>에러</>;

  return (
    <>
      <div className="max-w-sm rounded-lg border p-4 shadow-md">
        {userProfile && userProfile.avatar_url && (
          <img
            src={userProfile?.avatar_url}
            alt="Profile"
            className="mx-auto mb-4 h-24 w-24 rounded-full"
          />
        )}
        <h2 className="mb-2 text-center text-lg font-semibold">
          {userProfile.nickname}
        </h2>

        <FollowButton
          loginUserId={loginUserId}
          followUserId={userProfile.id}
          type={"card"}
        />
      </div>

      <FollowForm loginUserId={loginUserId} profileUser={profileUser} />
    </>
  );
};

export default ProfilePage;
