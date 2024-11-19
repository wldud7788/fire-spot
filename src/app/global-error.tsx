"use client"; // Error boundaries must be Client Components

/** 레이아웃이나 메인 페이지에서 발생하는 에러 */
export default function GlobalError({
  error,
  reset
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    // global-error must include html and body tags
    <html>
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
        </div>
      </div>
    </html>
  );
}
