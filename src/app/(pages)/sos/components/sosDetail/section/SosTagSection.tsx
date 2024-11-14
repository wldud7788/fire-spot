import React from "react";
import { SosSelect } from "../../../types/sos.types";
type Props = {
  sos: SosSelect;
};

const SosTagSection = ({ sos }: Props) => {
  const { tag } = sos;

  console.log("tag =>", tag);
  // SOS 상세 태그 섹션 (tag = string[])
  return (
    <div className="flex flex-col gap-[20px]">
      <strong className="text-[14px]">추천 태그</strong>
      <ul className="flex items-center gap-[20px]">
        {tag.map((item) => {
          return (
            <li key={item} className="text-[14px] text-[#969696]">
              #{item}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default SosTagSection;
