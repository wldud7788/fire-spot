import React, { useEffect, useState } from "react";
import { createClient } from "@/_utils/supabase/client";
import ReviewSlideCard from "../review/ReviewSlideCard";
import Slide from "../slide/Slide";
import { Database } from "../../../database.types";
import { useQuery } from "@tanstack/react-query";

const supabase = createClient();
type CampReviewSlideProps = {
  campId: string;
  onReviewCountChange?: (count: number) => void;
  onAverageRateChange?: (averageRate: number) => void;
};

const CampReviewSlide: React.FC<CampReviewSlideProps> = ({
  campId,
  onReviewCountChange,
  onAverageRateChange
}) => {
  const [averageRate, setAverageRate] = useState<number | null>(null);
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

  useEffect(() => {
    if (reviews && reviews.length > 0) {
      const totalRate = reviews.reduce(
        (acc, review) => acc + (review.rating || 0),
        0
      );
      const calculatedAverage = totalRate / reviews.length;

      setAverageRate(calculatedAverage);
      if (onAverageRateChange) {
        onAverageRateChange(calculatedAverage);
      }
    }
  }, [reviews, onAverageRateChange]);

  // 리뷰 데이터가 변경될 떄마다 갯수를 부모에게 전달
  useEffect(() => {
    if (reviews && onReviewCountChange) {
      onReviewCountChange(reviews.length);
    }
  }, [reviews, onReviewCountChange]);

  if (!reviews) {
    return <div>리뷰 데이터가 없습니다.</div>;
  }

  return (
    <div>
      {/* 리뷰 슬라이드 */}
      <Slide slidePerview={3} spaceBetween={10}>
        {reviews.map((review) => (
          <ReviewSlideCard key={review.id} review={review} />
        ))}
      </Slide>
    </div>
  );
};

export default CampReviewSlide;
