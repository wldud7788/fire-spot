import React from "react";

interface CustomInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string; // 추가적인 클래스 이름을 받을 수 있도록 함
  inputType?: "header" | "main" | string; // 타입을 선택적으로 설정
  onClick?: (event: React.MouseEvent<HTMLInputElement>) => void; // 클릭 핸들러 추가
  placeholder?: string; // 플레이스홀더 추가
}

const CustomInput: React.FC<CustomInputProps> = ({
  value,
  onChange,
  className = "", // 기본값 설정
  inputType = "text", // 기본 inputType 설정
  onClick,
  placeholder
}) => {
  return (
    <div className={`relative z-40 ${className}`}>
      <input
        type={inputType === "header" ? "text" : inputType} // inputType에 따라 타입 설정
        value={value}
        onChange={onChange}
        onClick={onClick} // 클릭 핸들러 연결
        className="w-full bg-transparent focus:outline-none" // 기본 클래스
        placeholder={placeholder} // 플레이스홀더 설정
        aria-label={placeholder} // 접근성 향상을 위한 aria-label 추가
      />
      <div className="input_line absolute bottom-0 left-[calc(100%-80%)] h-[1px] w-0 bg-gray-300 transition-all duration-200"></div>
    </div>
  );
};

export default CustomInput;
