import React from "react";
import useSosRemainingTime from "../../../hooks/useSosRemainingTime";
import { SosSelect } from "../../../types/sos.types";
type Props = {
  sos: SosSelect;
};

const SosRemainingTimeSection = ({ sos }: Props) => {
  const { remainingTimeString } = useSosRemainingTime(new Date(sos.created_at));

  // SOS 상세 도움요청남은시간 섹션 (remainingTimeString 실시간으로 남은 시간 표시됨)
  return (
    <div className="my-[60px] flex items-center justify-center text-[24px] font-medium text-[#969696] max-989:my-[40px] max-989:text-[18px]">
      요청 남은 시간 : {remainingTimeString}
    </div>
  );
};

export default SosRemainingTimeSection;
