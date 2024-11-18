"use client";
import FollowForm from "@/_components/follower/FollowForm";
import { getUser } from "@/_utils/auth";
import React, { useEffect, useState } from "react";

const Followers = () => {
  // 클릭한 유저의 프로필
  const [loginUserId, setLoginUserId] = useState("");

  useEffect(() => {
    const getLoginUserId = async () => {
      const getUserId = await getUser();
      if (!getUserId) return <div>유저 정보를 가져오지 못했습니다.</div>;

      setLoginUserId(getUserId.id);
    };
    getLoginUserId();
  }, []);

  return <FollowForm loginUserId={loginUserId} profileUser={loginUserId} />;
};

export default Followers;
