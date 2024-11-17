import React from "react";
import { SosSelect } from "../../../types/sos.types";
type Props = {
  sos: SosSelect;
};

const SosTitleSection = ({ sos }: Props) => {
  const { title } = sos;
  // const { isProgress } = useSosRemainingTime(new Date(sos.created_at));

  // SOS 상세 제목 섹션
  return (
    <div className="sos_tit">
      {/* 제목 */}
      <h1 className="text-[28px] font-extrabold max-1280:text-[24px]">
        {title}
      </h1>
      {/* 진행중(true), 종료됨(false) */}
      {/* {isProgress.toString()} */}
    </div>
  );
};

export default SosTitleSection;
