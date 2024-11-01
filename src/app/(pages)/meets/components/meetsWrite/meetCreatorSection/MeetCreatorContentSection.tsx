import React, { useState } from "react";
import { MeetForm } from "../../../types/meet.types";
import {
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch
} from "react-hook-form";

interface Props {
  register: UseFormRegister<MeetForm>;
  watch: UseFormWatch<MeetForm>;
  setValue: UseFormSetValue<MeetForm>;
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
    setValue(key, supplies);
  };

  const handleFilterSupplies = (index: number) => {
    supplies.splice(index, 1);
    setValue(key, supplies);
  };

  return (
    <section className="flex w-full flex-col gap-24 rounded-[20px] border-[1px] border-[##B5B5B5] px-[53px] py-24">
      <input
        className="h-full w-full border-b-[3px] border-black p-[10px]"
        placeholder="모임 이름을 입력해주세요 (00글자 제한)"
        {...register("title", { required: true })}
      />
      <div className="flex flex-col">
        <h2 className="text-[20px]">모임장 한 마디 & 모임 소개</h2>
        <textarea
          className="h-[129px] w-full rounded-[6px] border-[1px] border-[#C3C3C3] p-[10px]"
          placeholder="잘 맞는 친구들을 만나기 위해서는 자세한 설명을 할 수록 좋아요!"
          {...register("content", { required: true })}
        />
      </div>

      <div className="flex flex-col gap-[20px]">
        <h2 className="text-[20px]">준비물</h2>
        <div className="flex gap-[22px]">
          {/* <input
            className="h-[45px] w-[300px] rounded-[6px] border-2 bg-white px-4"
            placeholder="엔터로도 입력이 가능합니다."
            {...register("supplies")}
          /> */}
          <input
            className="h-[45px] w-[300px] rounded-[6px] border-2 bg-white px-4"
            placeholder="엔터로도 입력이 가능합니다."
            onChange={handleChangeSuppliesInput}
          />
          <button
            type="button"
            className="flex items-center rounded-[11px] border-[1px] border-[#C3C3C3] p-[8px]"
            onClick={handleAddSupplies}
          >
            <div className="h-6 w-6 bg-plus bg-cover bg-center" />
            <span>추가</span>
          </button>
        </div>

        <ul className="flex gap-2">
          {supplies.map((item, index) => (
            <li
              key={index}
              className="flex h-[45px] items-center rounded-[22.5px] border-[1px] border-[#C3C3C3] p-2 px-4 py-[14px] text-[#A4A4A4]"
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

        {/* <div className="flex gap-2">
          <button
            type="button"
            className="flex h-[45px] items-center rounded-[22.5px] border-[1px] border-[#C3C3C3] p-2 px-4 py-[14px] text-[#A4A4A4]">
            <span>생수</span>
            <div className="h-6 w-6 bg-minus bg-cover bg-center" />
          </button>
        </div> */}
      </div>
    </section>
  );
};

export default MeetCreatorContentSection;
