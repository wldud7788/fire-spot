"use client";

import { getUserWithProfile, getUser, signOut } from "@/_utils/auth";
import { useEffect, useState } from "react";
import { User } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";
import MainIconButton from "./MainIconButton";
import Link from "next/link";
import { ProfileSelect, UserWithProfile } from "../chat/types/Profile.types";

const MainUserCard = () => {
  const router = useRouter();
  const [userWithProfile, setUserWithProfile] =
    useState<UserWithProfile | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const currentUser = await getUserWithProfile();
      setUserWithProfile(currentUser);
    };
    fetchUser();
  }, []);

  const handleLogout = async () => {
    await signOut();
    setUserWithProfile(null);
    setTimeout(() => {
      router.push("/sign-in");
    });
    // router.push("/sign-in");
  };

  if (!userWithProfile || !userWithProfile.profile || !userWithProfile.user) {
    return (
      <div className="m-auto flex h-full w-full max-w-[240px] flex-col items-center justify-center gap-[64px] py-[23%] text-center max-1460:py-[60px] max-989:gap-[30px] max-989:py-[0]">
        <p className="text-[24px] font-bold leading-[1.3] max-1460:text-[18px]">
          환영합니다.
          <br />
          로그인 후 사용하세요.
        </p>
        <div className="flex w-full">
          <Link
            href={"/sign-in"}
            className="flex h-[60px] flex-1 items-center justify-center rounded-[10px] bg-[#b24600] text-[24px] font-semibold text-[#fff] max-1460:h-[50px] max-1460:text-[22px]"
          >
            로그인
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="flex h-full items-center justify-center gap-[30px] max-989:flex-wrap">
        {/* left_area */}
        <div className="left_area flex-1 text-center">
          <div className="mx-auto mb-[25px] h-[215px] w-[215px] overflow-hidden rounded-[100%] shadow-custom max-1460:h-[180px] max-1460:w-[180px] max-1160:h-[110px] max-1160:w-[110px]">
            <img
              className="h-full w-full object-cover"
              src={
                userWithProfile.profile.avatar_url ||
                userWithProfile.user.user_metadata.avatar_url ||
                "/assets/images/default_profile.jpeg"
              }
              alt={`${userWithProfile.profile?.nickname} 이미지`}
            />
          </div>
          <ul className="flex items-center justify-center">
            <li className="main-user-before relative mr-[9px] w-[calc(50%-9px)] pr-[9px]">
              <strong className="flex items-center gap-[3px] text-[16px] font-semibold">
                <span className="line-clamp-1 flex-1 text-right max-1280:text-[14px]">
                  {userWithProfile.profile.nickname ||
                    userWithProfile.profile.user_name}
                </span>
                <span className="flex-none max-1280:text-[14px]">님</span>
              </strong>
            </li>
            <li className="w-[calc(50%-9px)]">
              <p className="color-gray04 text-left text-[16px] font-semibold uppercase max-1280:text-[14px]">
                {userWithProfile.user.app_metadata.provider || ""} 계정
              </p>
            </li>
          </ul>
          <p className="mb-[25px] mt-[12px] text-[16px] max-1460:text-[14px] max-1280:text-[13px]">
            {userWithProfile.profile.email}
          </p>
          <button
            className="bg-sub w-full max-w-[190px] rounded-[10px] py-[12px] text-[18px] font-medium max-1160:text-[16px]"
            onClick={handleLogout}
          >
            로그아웃
          </button>
        </div>
        {/*// left_area */}
        {/* right_area */}
        <div className="right_area w-full max-w-[115px] max-1160:max-w-[80px] max-989:max-w-[100%]">
          <div className="link_box flex flex-col gap-[10px] max-989:flex-row">
            <MainIconButton
              href={"/mypage"}
              src="/assets/images/main/ico-main-meet.svg"
              alt={"내 모임 이미지"}
              text={"내 모임"}
            />
            <MainIconButton
              href={"/mypage"}
              src="/assets/images/main/ico-main-review.svg"
              alt={"내 후기 이미지"}
              text={"내 후기"}
            />
            <MainIconButton
              href={"/mypage"}
              src="/assets/images/main/ico-main-tip.svg"
              alt={"캠핑 꿀팁 이미지"}
              text={"캠핑 꿀팁"}
            />
          </div>
        </div>
        {/*// right_area */}
      </div>
    </>
  );
};

export default MainUserCard;
