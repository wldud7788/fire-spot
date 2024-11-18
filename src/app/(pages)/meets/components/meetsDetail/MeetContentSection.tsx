import React from "react";
import { MeetWithCamp } from "../../types/meet.types";
import { useSuspenseQuery } from "@tanstack/react-query";
import { QK_USER_PROFILE_ALL } from "@/_utils/api/queryKeys/followQueryKeys";
import { getUserProfile } from "@/_utils/service/followService";
import Link from "next/link";
type Props = {
  meetWithCamp: MeetWithCamp;
};
const MeetContentSection = ({ meetWithCamp }: Props) => {
  const { meet } = meetWithCamp;
  // 유저 프로필을 가져오는 쿼리
  const { data: writeUser } = useSuspenseQuery({
    queryKey: QK_USER_PROFILE_ALL(meet.user_id),
    queryFn: () => getUserProfile(meet.user_id),
    staleTime: 0
  });

  if (!writeUser) return <>유저 정보 로딩중</>;
  console.log(writeUser);

  return (
    <div className="mt-[80px] max-989:mt-[60px]">
      <h2 className="color-gray01 text-[24px] font-bold max-1280:text-[20px] max-1160:text-[18px]">
        모임소개 및 모임장 한마디
      </h2>
      <div className="mt-[37px] flex flex-wrap content-stretch gap-[50px] max-1280:gap-[20px] max-767:mt-[20px] max-767:flex-col">
        <div className="flex w-[285px] flex-none flex-col items-center justify-center rounded-[12px] border border-[#A6A6A6] bg-[#f6f6f6] p-[30px] max-767:w-full">
          <div className="h-[100px] w-[100px] overflow-hidden rounded-full bg-[#d9d9d9]">
            {/* 유저 이미지 */}
            <img
              className="h-full w-full object-cover"
              src={writeUser.avatar_url ? writeUser.avatar_url : ""}
              alt={`${writeUser.user_name}님의 프로필 이미지 입니다.`}
            />
          </div>
          <strong className="color-gray01 my-[12px] block text-[18px] font-bold max-989:text-[16px]">
            {writeUser.user_name}
          </strong>
          <Link
            href={`/profile/${writeUser.id}`}
            target="_blank"
            className="bg-main flex h-[35px] w-full items-center justify-center rounded-[8px] text-[14px] text-white"
          >
            프로필 보기
          </Link>
        </div>
        <div className="w-full max-w-[calc(100%-335px)] rounded-[12px] border border-[#A6A6A6] px-[30px] py-[20px] max-1280:max-w-[calc(100%-305px)] max-1280:p-[20px] max-767:max-w-[100%]">
          <div className="text-[16px] text-[#757575] max-767:text-[14px]">
            {meet.content}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MeetContentSection;
