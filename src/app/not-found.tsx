"use client";

import Link from "next/link";
import React from "react";
import BeginnerPage from "./(pages)/(guide)/beginner/page";

const NotFound = () => {
  return (
    <div className="flex h-svh w-full flex-col items-center justify-center gap-10 p-5">
      <img
        src="/assets/images/logo.svg"
        alt="logo"
        className="w-[150px] max-767:w-[100px]"
      />
      <h1 className="text-2xl text-[#2E2F2E]">찾을 수 없음(404)</h1>
      <p>
        죄송합니다. 찾으시는 페이지가 존재하지 않습니다.{" "}
        <Link href={"/"} className="color-main">
          홈으로{" "}
        </Link>
        이동하시겠습니까?
      </p>
    </div>
  );
};

export default NotFound;
