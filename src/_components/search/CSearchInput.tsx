import React from "react";
import clsx from "clsx"; // clsx 라이브러리 import

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string; // className 속성을 추가
}

const CSearchInput: React.FC<Props> = ({ className, ...props }) => {
  return (
    <input
      {...props} // input에 props 전달
      className={clsx(
        "search_icon relative z-10 w-full rounded-2xl border border-slate-300 bg-transparent focus:outline-none",
        className // 전달된 className을 추가
      )}
      aria-label="검색어 입력" // 접근성 향상을 위한 aria-label 추가
    />
  );
};

export default CSearchInput;
