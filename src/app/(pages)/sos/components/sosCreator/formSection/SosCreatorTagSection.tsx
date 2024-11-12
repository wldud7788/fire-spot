import React, { useState } from "react";
import { UseFormSetValue, UseFormWatch } from "react-hook-form";
import { SosInsert } from "../../../types/sos.types";

type Props = {
  watch: UseFormWatch<SosInsert>;
  setValue: UseFormSetValue<SosInsert>;
};

const SosCreatorTagSection = ({ watch, setValue }: Props) => {
  const [tagInput, setTagInput] = useState("");
  const key = "tag";
  const tag = watch(key);

  const handleChangeTagInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTagInput(e.target.value);
  };

  const handleAddTag = () => {
    tag.push(tagInput);
    setTagInput("");
    setValue(key, tag);
  };

  const handleFilterTag = (index: number) => {
    tag.splice(index, 1);
    setValue(key, tag);
  };

  // TODO 민규님: Tag 작성 섹션
  return (
    <section className="flex w-full flex-col gap-24 rounded-[20px] border-[1px] border-[##B5B5B5] px-[53px] py-24">
      <div className="flex flex-col gap-[20px]">
        <h2 className="text-[20px]">태그</h2>
        <div className="flex gap-[22px]">
          <input
            className="h-[45px] w-[300px] rounded-[6px] border-2 bg-white px-4"
            placeholder="엔터로도 입력이 가능합니다."
            value={tagInput}
            onChange={handleChangeTagInput}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleAddTag(); // Enter 키를 눌렀을 때 호출할 함수
                // e.preventDefault(); // 기본 동작 방지 (폼 제출 등)
              }
            }}
          />
          <button
            type="button"
            className="flex items-center rounded-[11px] border-[1px] border-[#C3C3C3] p-[8px]"
            onClick={handleAddTag}
          >
            <div className="h-6 w-6 bg-plus bg-cover bg-center" />
            <span>추가</span>
          </button>
        </div>

        <ul className="flex gap-2">
          {/* TODO 민규님: tag: string[] 반복문 돌려서 태그 보여줍니다.*/}
          {tag.map((item, index) => (
            <li
              key={index}
              className="flex h-[45px] flex-wrap items-center rounded-[22.5px] border-[1px] border-[#C3C3C3] p-2 px-4 py-[14px] text-[#A4A4A4]"
            >
              <button
                type="button"
                className="flex"
                onClick={() => handleFilterTag(index)}
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

export default SosCreatorTagSection;
