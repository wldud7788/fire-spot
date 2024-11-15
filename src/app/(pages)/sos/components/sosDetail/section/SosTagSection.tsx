import React from "react";
import { SosSelect } from "../../../types/sos.types";
type Props = {
  sos: SosSelect;
};

const SosTagSection = ({ sos }: Props) => {
  const { tag } = sos;

  // SOS 상세 태그 섹션 (tag = string[])
  return (
    <div className="flex flex-col gap-[20px] max-989:gap-[15px]">
      <strong className="text-[14px]">추천 태그</strong>
      <ul className="flex items-center gap-[20px] max-989:gap-[10px]">
        {tag.map((item) => {
          return (
            <li
              key={item}
              className="text-[14px] text-[#969696] max-989:text-[13px]"
            >
              #{item}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default SosTagSection;
