"use client";
import { createClient } from "@/_utils/supabase/client";
import { Camp } from "@/app/(pages)/camps/types/Camp";
import { CampSelect } from "@/app/(pages)/meets/types/camp.types";
import { useQuery } from "@tanstack/react-query";
import React from "react";

interface ReviewBookMarkCountProps {
  campId: string | number;
  camp: CampSelect | Camp;
}

const ReviewBookMarkCount: React.FC<ReviewBookMarkCountProps> = ({
  campId,
  camp
}) => {
  const supabase = createClient();

  const { data, isLoading, error } = useQuery({
    queryFn: async () => {
      // contentId로 review와 bookmarks 데이터 각각 가져오기
      const [reviews, bookmarks] = await Promise.all([
        supabase.from("review").select("*").eq("campId", campId),
        supabase.from("bookmarks").select("*").eq("contentId", campId)
      ]);

      if (reviews.error) throw reviews.error;
      if (bookmarks.error) throw bookmarks.error;

      return {
        reviews: reviews.data,
        bookmarks: bookmarks.data
      };
    },
    queryKey: ["campReviewsAndBookmarks", campId]
  });

  // 로딩 상태 처리
  if (isLoading) {
    return (
      <>
        <p className="color-gray04 flex items-center gap-[2px] text-[12px]">
          <img
            className="relative top-[-1px]"
            src="/assets/images/main/ico-main-review-count.svg"
            alt={`${camp.facltNm} 후기 갯수 이미지`}
          />
          <span>...</span>
        </p>
        <p className="color-gray04 flex items-center gap-[2px] text-[12px]">
          <img
            src="/assets/images/main/ico-main-bookmark-count.svg"
            alt={`${camp.facltNm}좋아요 갯수 이미지`}
          />
          <span>...</span>
        </p>
      </>
    );
  }

  // 에러 상태 처리
  if (error) {
    console.error("Error fetching data:", error);
    return <div>데이터를 불러오는 중 오류가 발생했습니다.</div>;
  }

  return (
    <div className="flex items-center gap-4 text-sm">
      <p className="color-gray04 flex items-center gap-[2px] text-[12px]">
        <img
          className="relative top-[-1px]"
          src="/assets/images/main/ico-main-review-count.svg"
          alt={`${camp.facltNm} 후기 갯수 이미지`}
        />
        <span>{data?.reviews?.length || 0}</span>
      </p>
      <p className="color-gray04 flex items-center gap-[2px] text-[12px]">
        <img
          src="/assets/images/main/ico-main-bookmark-count.svg"
          alt={`${camp.facltNm}좋아요 갯수 이미지`}
        />
        <span>{data?.bookmarks?.length || 0}</span>
      </p>
    </div>
  );
};

export default ReviewBookMarkCount;
