import React from "react";
import clsx from "clsx"; // clsx 라이브러리 import

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string; // className 속성을 추가
}

const CSearchInput: React.FC<Props> = ({ className, ...props }) => {
  return (
    <div className={clsx("relative", className)}>
      <input
        {...props} // input에 props 전달
        className={clsx(
          "search_icon h-10 w-full rounded-2xl border border-slate-300 bg-transparent focus:outline-none"
        )} // clsx로 클래스 결합
        aria-label="검색어 입력" // 접근성 향상을 위한 aria-label 추가
      />
      <div className="input_line absolute bottom-0 left-[calc(100%-80%)] h-[1px] w-0 bg-gray-300 transition-all duration-200"></div>
    </div>
  );
};

export default CSearchInput;
