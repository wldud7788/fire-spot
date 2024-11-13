import React from "react";
import useSosRemainingTime from "../../../hooks/useSosRemainingTime";
import { SosSelect } from "../../../types/sos.types";
type Props = {
  sos: SosSelect;
};

const SosRemainingTimeSection = ({ sos }: Props) => {
  const { remainingTimeString } = useSosRemainingTime(new Date(sos.created_at));

  // TODO 민규님: SOS 상세 도움요청남은시간 섹션 (remainingTimeString 실시간으로 남은 시간 표시됨)
  return <div>{remainingTimeString}</div>;
};

export default SosRemainingTimeSection;
