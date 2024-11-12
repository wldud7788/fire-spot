import React from "react";
import { UseFormSetValue, UseFormWatch } from "react-hook-form";
import { SOS_TYPE, SosInsert } from "../../../types/sos.types";

type Props = {
  watch: UseFormWatch<SosInsert>;
  setValue: UseFormSetValue<SosInsert>;
};

const SosCreatorTypeSection = ({ watch, setValue }: Props) => {
  return (
    <section className="mt-[123px]">
      <h2 className="mb-[70px] text-xl font-[500]">SOS 유형</h2>
      <div className="flex gap-[14px] border-b-[1px] border-[#D4D4D4] pb-[37px] font-[15px]">
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
            className={`h-[45px] rounded-[22.5px] border-[1px] border-[#C3C3C3] px-4 py-[14px] pb-2 pl-7 pr-7 pt-2 text-[#A4A4A4] ${watch("type") === key ? "bg-[#D9D9D9] font-[600]" : ""}`}
          >
            {value}
          </button>
        ))}
      </div>
    </section>
  );
};

export default SosCreatorTypeSection;
