"use client";

import React from "react";
import { createClient } from "@/_utils/supabase/client";
import { useQuery } from "@tanstack/react-query";

const supabase = createClient();

type CampReviewCountProps = {
  campId: string;
};

const CampReviewCount: React.FC<CampReviewCountProps> = ({ campId }) => {
  // 해당 캠핑장의 리뷰 총 개수 가져오기
  const {
    data: reviewCount,
    isLoading,
    error
  } = useQuery({
    queryKey: ["campReviewCount", campId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("review")
        .select("count,camp(*)")
        .eq("campId", campId)
        .single();

      if (error) {
        console.error("리뷰 총 개수를 가져오는 중 에러 발생:", error);
        throw error;
      }

      return data?.count || 0;
    }
  });

  if (isLoading) {
    return <div>리뷰 데이터를 불러오는 중입니다...</div>;
  }

  if (error) {
    return <div>리뷰 데이터를 불러오는 중 에러가 발생했습니다.</div>;
  }

  return (
    <div>
      <h1>캠핑장 리뷰 총 개수</h1>
      <p>{reviewCount}개</p>
    </div>
  );
};

export default CampReviewCount;
