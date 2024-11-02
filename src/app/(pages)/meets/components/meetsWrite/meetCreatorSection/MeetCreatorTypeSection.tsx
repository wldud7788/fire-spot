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
    <section className="mt-[123px]">
      <h2 className="mb-[70px] text-xl font-[500]">캠핑 유형</h2>
      <div className="flex gap-[14px] border-b-[1px] border-[#D4D4D4] pb-[37px] font-[15px]">
        {Object.entries(groundTypes).map(([key, value]) => (
          <button
            key={key}
            type="button"
            onClick={() => {
              // 선택된 값으로 설정
              setValue("ground_type", key);
            }}
            className={`h-[45px] rounded-[22.5px] border-[1px] border-[#C3C3C3] px-4 py-[14px] pb-2 pl-7 pr-7 pt-2 text-[#A4A4A4] ${watch("ground_type") === key ? "bg-[#D9D9D9] font-[600]" : ""}`}
          >
            {value}
          </button>
        ))}
      </div>

      <div className="flex gap-[14px] border-[#D4D4D4] pt-[37px] font-[15px]">
        <button
          type="button"
          onClick={() => {
            // 선택된 값으로 설정
            setValue("is_newbie", true);
          }}
          className={`h-[45px] rounded-[22.5px] border-[1px] border-[#C3C3C3] px-4 py-[14px] pb-2 pl-7 pr-7 pt-2 text-[#A4A4A4] ${watch("is_newbie") === true ? "bg-[#D9D9D9] font-[600]" : ""}`}
        >
          초보가능
        </button>
        <button
          type="button"
          onClick={() => {
            // 선택된 값으로 설정
            setValue("is_newbie", false);
          }}
          className={`h-[45px] rounded-[22.5px] border-[1px] border-[#C3C3C3] px-4 py-[14px] pb-2 pl-7 pr-7 pt-2 text-[#A4A4A4] ${watch("is_newbie") === false ? "bg-[#D9D9D9] font-[600]" : ""}`}
        >
          숙련자
        </button>
      </div>
    </section>
  );
};

export default MeetCreatorTypeSection;
