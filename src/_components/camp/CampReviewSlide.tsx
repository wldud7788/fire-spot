import React, { useEffect, useState } from "react";
import { createClient } from "@/_utils/supabase/client";
import ReviewSlideCard from "../review/ReviewSlideCard";
import Slide from "../slide/Slide";
import { Database } from "../../../database.types";
import { useQuery } from "@tanstack/react-query";

const supabase = createClient();

// type Review = {
//   id: number;
//   campId: string;
//   title: string;
//   content: string;
//   likes: number;
// };

type Review = Database["public"]["Tables"]["review"]["Row"];

type CampReviewSlideProps = {
  campId: string;
};

const CampReviewSlide: React.FC<CampReviewSlideProps> = ({ campId }) => {
  const { data: reviews } = useQuery({
    queryFn: async () => {
      const reviewList = await supabase
        .from("review")
        .select("*,camp(*)")
        .eq("campId", campId);
      return reviewList.data;
    },
    queryKey: ["reviewList", campId]
  });
  if (!reviews) {
    return <div>리뷰 데이터가 없습니다.</div>;
  }
  return (
    <Slide slidePerview={3} spaceBetween={10}>
      {reviews.map((review) => (
        <ReviewSlideCard key={review.id} review={review} />
      ))}
    </Slide>
  );
};

export default CampReviewSlide;

// 요기 수파베이스 불러오기 슬라이드로 감싸기
// 아이디가 포함되어있는 리뷰만 뽑아오기
// useState 안에 담기 요기서~
// 담아져있는 state를 map 돌리기 FeedCard 대신에 컴포넌트(수파베이스 리뷰 관련) 하나 만들어서 불러오기
