import React from "react";
import { SosSelect } from "../../../types/sos.types";
type Props = {
  sos: SosSelect;
};

const SosTagSection = ({ sos }: Props) => {
  const { tag } = sos;

  // TODO 민규님: SOS 상세 태그 섹션 (tag = string[])
  return <div>{tag}</div>;
};

export default SosTagSection;
