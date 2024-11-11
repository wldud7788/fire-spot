"use client";
import { createClient } from "@/_utils/supabase/client";
import Link from "next/link";
import React from "react";

type Provider = "kakao" | "google";
const SignIn = () => {
  const url = process.env.NEXT_PUBLIC_VERCEL_URL;
  // console.log("여기는 윈도우", window.location.host);
  console.log("여기는 url", url);
  // const url = process.env.NEXT_PUBLIC_VERCEL_URL
  const supabase = createClient();
  const signInWithProvider = async (provider: Provider) => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${url}/auth/callback` //ToDo - 배포 이후 버셀로 도메인 변경 서버로 바꾸면 window가 없어서 고장남
      }
    });
    if (error) {
      return (
        <div>
          {provider} 로그인 오류 {error.message}
        </div>
      );
    }
  };

  return (
    <section className="flex min-h-[calc(100vh-16rem)] flex-col items-center justify-center">
      <div className="flex w-[480px] flex-col items-center gap-11 border p-14">
        <h2 className="text-2xl font-bold text-black">
          SNS계정으로 간편 로그인
        </h2>
        <div className="flex flex-col items-center gap-4">
          <button
            onClick={() => signInWithProvider("kakao")}
            className="mt-3 flex h-[50px] w-[348px] items-center justify-center gap-4 rounded-md bg-[#FAE64C] font-bold text-black shadow-buttonShadow hover:bg-[#fded6f]"
          >
            <img src="/assets/images/kakao.png" alt="" />
            <span>카카오로 시작하기</span>
          </button>
          <button
            onClick={() => signInWithProvider("google")}
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
