"use client";

import { getUser } from "@/_utils/auth";
import MainButton from "./MainButton";
import { useEffect, useState } from "react";
import { User } from "@supabase/supabase-js";

const MainUserCard = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const currentUser = await getUser();
      setUser(currentUser);
      console.log(currentUser);
    };
    fetchUser();
  }, []);

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center gap-[20px] py-[23%]">
        <p className="text-[24px] font-bold">로그인을 해주세요!</p>
        <div className="flex w-full">
          <MainButton text={"로그인"} href="/sign-in" />
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="mb-[20px] flex items-center">
        <img src="/assets/images/ico-fire-spot.svg" />
        <p className="w-[calc(100%-150px)] break-all text-[24px] font-bold">
          {user.email}
        </p>
      </div>
      <div className="mb-[15px] flex gap-[15px]">
        <MainButton text={"내 모임"} href="#" />
        <MainButton text={"내 후기"} href="#" />
      </div>
      <MainButton text={"캠핑 꿀팁 바로가기"} href="#" />
    </>
  );
};

export default MainUserCard;
