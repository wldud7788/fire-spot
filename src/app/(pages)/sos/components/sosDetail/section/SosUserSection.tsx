import React from "react";
import { SosWithCamp } from "@/app/(pages)/sos/types/sos.types";
import { formatDate_5 } from "@/_utils/common/dateFormat";
type Props = {
  sosWithCamp: SosWithCamp;
};
const SosUserSection = ({ sosWithCamp }: Props) => {
  const { sos, camp, profile } = sosWithCamp;

  const userName = profile.nickname || profile.user_name;
  const dateString = formatDate_5(sos.created_at);

  // TODO 민규님: SOS 상세 유저 정보 섹션
  return (
    <div>
      {/* 작성자 프사 */}
      {profile.avatar_url}
      {/* 작성자명 (닉네임 없으면 구글이나 카카오 계정명) */}
      {userName}
      {/* 시군구 */}
      {camp.sigunguNm}
      {/* 날짜 (24시간 전이면 N시간 전 , 24시간 이후면 날짜 표시) */}
      {dateString}
      드롭다운버튼?
    </div>
  );
};

export default SosUserSection;
