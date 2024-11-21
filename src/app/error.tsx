"use client"; // Error boundaries must be Client Components

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Error({
  error,
  reset
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const router = useRouter();
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    // <div className="bg-error01 h-svh w-full bg-cover bg-no-repeat">
    <div className="bg-sub fixed top-[50px] flex h-svh w-full flex-col items-center justify-center gap-10 p-5">
      <img
        src="/assets/images/logo.svg"
        alt="logo"
        className="w-[150px] max-767:w-[100px]"
      />
      <h1 className="text-2xl text-[#2E2F2E]">
        현재 페이지에서 에러가 나고 있으니 다시 시도해주세요.
      </h1>
      <div className="flex gap-2">
        <button
          className="bd-color-main flex h-[30px] items-center justify-center rounded-[8px] border-[2px] bg-white p-2"
          onClick={() => reset()}
        >
          다시 시도하기
        </button>
        <button
          className="bd-color-main flex h-[30px] items-center justify-center rounded-[8px] border-[2px] bg-white p-2"
          onClick={() => router.push("/")}
        >
          메인으로 이동하기
        </button>
      </div>
    </div>
  );
}
