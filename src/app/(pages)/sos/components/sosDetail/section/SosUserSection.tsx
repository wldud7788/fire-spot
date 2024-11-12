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
    <div className="utils mt-[60px] flex items-center gap-[15px] border-b-2 border-[#EBECF0] pb-[10px]">
      <div className="h-[50px] w-[50px] overflow-hidden rounded-full">
        {/* 작성자 프사 */}
        <img
          className="h-full w-full object-cover"
          src={profile.avatar_url || ""}
          alt={`${userName} 이미지`}
        />
      </div>
      <div className="flex flex-col justify-between">
        <strong>
          {/* 작성자명 (닉네임 없으면 구글이나 카카오 계정명) */}
          {userName}
        </strong>
        <p className="flex items-center">
          {/* 시군구 */}
          <span className="color-gray02 py-[5px] text-[14px]">
            {camp.sigunguNm}
          </span>
          <span className="before-dot-left color-gray02 relative ml-[5px] pl-[10px] text-[14px]">
            {dateString}
          </span>
        </p>
      </div>
      {/* 날짜 (24시간 전이면 N시간 전 , 24시간 이후면 날짜 표시) */}

      {/* 드롭다운버튼? */}
    </div>
  );
};

export default SosUserSection;
