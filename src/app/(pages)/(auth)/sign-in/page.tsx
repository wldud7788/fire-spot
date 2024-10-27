"use client";
import { createClient } from "@/_utils/supabase/client";
import Link from "next/link";
import React from "react";

const SignIn = () => {
  const supabase = createClient();
  const signInWithKakao = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "kakao",
      options: {
        redirectTo: `${window.location.host}/auth/callback` //ToDo - 배포 이후 버셀로 도메인 변경 서버로 바꾸면 window가 없어서 고장남
      }
    });
  };
  const signInWithGoogle = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.host}/auth/callback`
      }
    });
  };

  return (
    <section className="flex flex-col items-center">
      <div className="flex w-[480px] flex-col items-center gap-11 border p-14">
        <h2 className="text-2xl font-bold text-black">
          SNS계정으로 간편 로그인
        </h2>
        <div className="flex flex-col items-center gap-4">
          <button
            onClick={signInWithKakao}
            className="mt-3 flex h-[50px] w-[348px] items-center justify-center gap-4 rounded-md bg-[#FAE64C] font-bold text-black shadow-buttonShadow hover:bg-[#fded6f]"
          >
            <img src="/assets/images/kakao.png" alt="" />
            <span>카카오로 시작하기</span>
          </button>
          <button
            onClick={signInWithGoogle}
            className="mt-3 flex h-[50px] w-[348px] items-center justify-center gap-4 rounded-md font-bold text-black shadow-buttonShadow hover:bg-slate-50"
          >
            <img src="/assets/images/google.png" alt="" />
            구글로 시작하기
          </button>
        </div>
        <p className="text-sm text-[#666666]">
          <Link href={"/"}>이용약관</Link> |{" "}
          <Link href={"/"}>개인정보처리방침</Link> | ⓒ 불멍스팟
        </p>
      </div>
    </section>
  );
};

export default SignIn;
