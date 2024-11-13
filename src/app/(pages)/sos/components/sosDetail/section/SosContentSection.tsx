import React from "react";
import { SosSelect } from "../../../types/sos.types";

type Props = {
  sos: SosSelect;
};

const SosContentSection = ({ sos }: Props) => {
  const { content } = sos;

  // SOS 상세 내용 섹션
  return (
    <div className="sos_desc min-h-[450px] py-[50px] text-[14px]">
      {content}
    </div>
  );
};

export default SosContentSection;
