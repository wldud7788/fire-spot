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
    <section className="mt-[40px] rounded-[12px] border border-[#D9D9D9] px-[30px] py-[40px]">
      <div className="flex flex-col gap-[20px]">
        <h2 className="color-gray01 flex items-center gap-[5px] text-[24px] font-bold">
          태그
        </h2>
        <div className="flex gap-[10px]">
          <input
            className="h-[45px] w-[300px] rounded-[6px] border border-[#c3c3c3] bg-white px-4"
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
            className="flex items-center rounded-[6px] border-[1px] border-[#c3c3c3] p-[8px]"
            onClick={handleAddTag}
          >
            <div className="h-6 w-6 bg-plus bg-cover bg-center" />
            <span>추가</span>
          </button>
        </div>

        <ul className="flex gap-[20px]">
          {/* TODO 민규님: tag: string[] 반복문 돌려서 태그 보여줍니다.*/}
          {tag.map((item, index) => (
            <li
              key={index}
              className="flex flex-wrap items-center rounded-[22.5px] border-[1px] border-[#c3c3c3] p-2 px-[16px] py-[10px] text-[#A4A4A4]"
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
