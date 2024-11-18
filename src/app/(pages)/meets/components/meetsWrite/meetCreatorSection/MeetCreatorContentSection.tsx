import React, { useState } from "react";
import { MeetInsert } from "../../../types/meet.types";
import {
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch
} from "react-hook-form";

interface Props {
  register: UseFormRegister<MeetInsert>;
  watch: UseFormWatch<MeetInsert>;
  setValue: UseFormSetValue<MeetInsert>;
}

const MeetCreatorContentSection = ({ register, watch, setValue }: Props) => {
  const [suppliesInput, setSuppliesInput] = useState("");
  const key = "supplies";
  const supplies = watch(key);
  const handleChangeSuppliesInput = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSuppliesInput(e.target.value);
  };
  const handleAddSupplies = () => {
    supplies.push(suppliesInput);
    setSuppliesInput("");
    setValue(key, supplies);
  };

  const handleFilterSupplies = (index: number) => {
    supplies.splice(index, 1);
    setValue(key, supplies);
  };

  return (
    <section className="mt-[40px] rounded-[12px] border border-[#D9D9D9] px-[30px] py-[100px]">
      <input
        className="h-full w-full border-b-2 border-[#c3c3c3] py-[20px] text-[14px] text-[#a4a4a4]"
        placeholder="모임 이름을 입력해주세요 (00글자 제한)"
        {...register("title", { required: true })}
      />
      <div className="mt-[40px] flex flex-col gap-[20px]">
        <h2 className="text-[18px] font-medium">모임장 한 마디 & 모임 소개</h2>
        <textarea
          className="h-[130px] w-full rounded-[6px] border-[1px] border-[#a8a8a8] p-[10px]"
          placeholder="잘 맞는 친구들을 만나기 위해서는 자세한 설명을 할 수록 좋아요!"
          {...register("content", { required: true })}
        />
      </div>

      <div className="mt-[40px] flex flex-col gap-[20px]">
        <h2 className="text-[18px] font-medium">준비물</h2>
        <div className="flex gap-[10px]">
          <input
            className="h-[45px] w-[300px] rounded-[6px] border border-[#c3c3c3] bg-white px-4"
            placeholder="엔터로도 입력이 가능합니다."
            value={suppliesInput}
            onChange={handleChangeSuppliesInput}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleAddSupplies(); // Enter 키를 눌렀을 때 호출할 함수
                e.preventDefault(); // 기본 동작 방지 (폼 제출 등)
              }
            }}
          />
          <button
            type="button"
            className="flex items-center rounded-[6px] border-[1px] border-[#c3c3c3] p-[8px]"
            onClick={handleAddSupplies}
          >
            <div className="h-6 w-6 bg-plus bg-cover bg-center" />
            <span>추가</span>
          </button>
        </div>

        <ul className="flex gap-[20px]">
          {supplies.map((item, index) => (
            <li
              key={index}
              className="flex flex-wrap items-center rounded-[22.5px] border-[1px] border-[#c3c3c3] p-2 px-[16px] py-[10px] text-[#A4A4A4]"
            >
              <button
                type="button"
                className="flex"
                onClick={() => handleFilterSupplies(index)}
              >
                <span>{item}</span>
                <div className="h-6 w-6 bg-minus bg-cover bg-center" />
              </button>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default MeetCreatorContentSection;
