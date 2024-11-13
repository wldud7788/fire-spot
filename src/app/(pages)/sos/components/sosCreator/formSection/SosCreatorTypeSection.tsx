import React from "react";
import { UseFormSetValue, UseFormWatch } from "react-hook-form";
import { SOS_TYPE, SosInsert } from "../../../types/sos.types";

type Props = {
  watch: UseFormWatch<SosInsert>;
  setValue: UseFormSetValue<SosInsert>;
};

const SosCreatorTypeSection = ({ watch, setValue }: Props) => {
  return (
    <div className="mt-[40px]">
      <h2 className="color-gray01 mb-[50px] text-[24px] font-bold">SOS 유형</h2>
      <div className="flex items-center gap-[18px]">
        {Object.entries(SOS_TYPE).map(([key, value]) => (
          <button
            key={key}
            type="button"
            onClick={() => {
              // 선택된 값으로 설정
              setValue("type", key);
            }}
            // TODO: 민규님
            // ${watch("type") === key가 같을 경우 className을 다르게 줬슴ㄴ다
            // value: 긴급, 캠핑질문 등이 출력됨니다.
            className={`rounded-[22.5px] px-[32px] py-[12px] text-[14px] font-bold ${watch("type") === key ? "bg-main border border-[#FF924C] text-white" : "color-gray01 border border-[#BFBFBF]"}`}
          >
            {value}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SosCreatorTypeSection;
