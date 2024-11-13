import React from "react";
import { MeetInsert } from "../../../types/meet.types";
import { UseFormSetValue, UseFormWatch } from "react-hook-form";

interface Props {
  watch: UseFormWatch<MeetInsert>;
  setValue: UseFormSetValue<MeetInsert>;
}

const groundTypes = {
  crushedStone: "파쇄석",
  woodenDeck: "나무데크",
  soil: "흙",
  any: "상관없음"
};

const MeetCreatorTypeSection = ({ watch, setValue }: Props) => {
  return (
    <section className="mt-[40px] rounded-[12px] border border-[#D9D9D9] px-[30px] py-[40px]">
      <h2 className="color-gray01 text-[24px] font-bold">캠핑 유형</h2>
      <div className="mt-[50px] flex items-center gap-[18px]">
        {Object.entries(groundTypes).map(([key, value]) => (
          <button
            key={key}
            type="button"
            onClick={() => {
              // 선택된 값으로 설정
              setValue("ground_type", key);
            }}
            className={`color-gray01 rounded-[20px] border border-[#bfbfbf] px-[30px] py-[12px] text-[14px] font-bold ${watch("ground_type") === key ? "bg-[#FFB180] font-[600]" : "bg-white"}`}
          >
            {value}
          </button>
        ))}
      </div>

      <div className="mt-[18px] flex items-center gap-[18px]">
        <button
          type="button"
          onClick={() => {
            // 선택된 값으로 설정
            setValue("is_newbie", true);
          }}
          className={`color-gray01 rounded-[20px] border border-[#bfbfbf] px-[30px] py-[12px] text-[14px] font-bold ${watch("is_newbie") === true ? "bg-[#FFB180] font-[600]" : "bg-white"}`}
        >
          초보가능
        </button>
        <button
          type="button"
          onClick={() => {
            // 선택된 값으로 설정
            setValue("is_newbie", false);
          }}
          className={`rounded-[20px] border border-[#bfbfbf] px-[30px] py-[12px] text-[14px] font-bold color-gray01${watch("is_newbie") === false ? "bg-[#FFB180] font-[600]" : "bg-white"}`}
        >
          숙련자
        </button>
      </div>
    </section>
  );
};

export default MeetCreatorTypeSection;
