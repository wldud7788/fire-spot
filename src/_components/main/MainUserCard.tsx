"use client";

import { getUser, signOut } from "@/_utils/auth";
import MainButton from "./MainButton";
import { useEffect, useState } from "react";
import { User } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";
import MainIconButton from "./MainIconButton";

const MainUserCard = () => {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const currentUser = await getUser();
      setUser(currentUser);
    };
    fetchUser();
  }, []);

  const handleLogout = async () => {
    await signOut();
    setUser(null);
    router.push("/sign-in");
  };

  if (!user) {
    return (
      <div className="m-auto flex w-full max-w-[240px] flex-col items-center justify-center gap-[64px] py-[23%] text-center">
        <p className="text-[24px] font-bold leading-[1.3]">
          환영합니다.
          <br />
          로그인 후 사용하세요.
        </p>
        <div className="flex w-full">
          <MainButton text={"로그인"} href="/sign-in" background="brown" />
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="flex items-center justify-center gap-[30px]">
        {/* left_area */}
        <div className="left_area text-center">
          <div className="ibox mb-[25px] h-[215px] w-[215px] overflow-hidden rounded-[100%]">
            <img
              className="h-full w-full object-cover"
              src={user.user_metadata.avatar_url}
              alt={`${user.user_metadata.name} 이미지`}
            />
          </div>
          <ul className="flex items-center justify-center">
            <li className="main-user-before relative mr-[9px] pr-[9px]">
              <strong className="text-[20px] font-semibold">
                {user.user_metadata.preferred_username}님
              </strong>
            </li>
            <li>
              <p className="color-gray04 text-[20px] font-semibold uppercase">
                {user.app_metadata.provider} 계정
              </p>
            </li>
          </ul>
          <p className="mb-[25px] mt-[12px] text-[16px]">{user.email}</p>
          <button
            className="bg-sub w-full max-w-[190px] rounded-[10px] py-[12px] text-[18px] font-medium"
            onClick={handleLogout}
          >
            로그아웃
          </button>
        </div>
        {/*// left_area */}
        {/* right_area */}
        <div className="right_area w-full max-w-[115px]">
          <div className="link_box flex flex-col gap-[10px]">
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
