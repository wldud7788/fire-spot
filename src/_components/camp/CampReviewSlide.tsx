import React, { useEffect, useState } from "react";
import { createClient } from "@/_utils/supabase/client";
import ReviewSlideCard from "../review/ReviewSlideCard";
import Slide from "../slide/Slide";

import { ReviewItem } from "@/app/(pages)/reviews/types/ReviewItem";
import { useQuery } from "@tanstack/react-query";
import ReviewModal from "../review/ReviewModal";
import NoData from "../common/NoData";

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
  // const [reviews, setReviews] = useState<ReviewItem[]>([]);
  const [averageRate, setAverageRate] = useState<number | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<ReviewItem | null>(null);
  const [slidePerview, setSlidePerview] = useState<number>(3);
  const handleModalOpen = (review: ReviewItem) => {
    setSelected(review);
    setIsOpen(true);
  };
  const handleModalClose = () => {
    setIsOpen(false);
    setSelected(null);
  };
  const { data: reviews } = useQuery({
    queryFn: async () => {
      const reviewList = await supabase
        .from("review")
        .select("*,camp(*),profile(*)")
        .eq("campId", campId);
      return reviewList.data as ReviewItem[];
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

    // 화면 크기에 따라 slidePerview 값 변경
    const handleResize = () => {
      const width = window.innerWidth;
      if (width <= 767) {
        setSlidePerview(1);
      } else if (width <= 1160) {
        setSlidePerview(2);
      } else {
        setSlidePerview(3); // 기본값
      }
    };

    handleResize(); // 초기 렌더링 시 호출
    window.addEventListener("resize", handleResize); // 윈도우 리사이즈 이벤트 등록
    return () => window.removeEventListener("resize", handleResize); // 정리
  }, [reviews, onAverageRateChange]);

  // 리뷰 데이터가 변경될 떄마다 갯수를 부모에게 전달
  useEffect(() => {
    if (reviews && onReviewCountChange) {
      onReviewCountChange(reviews.length);
    }
  }, [reviews, onReviewCountChange]);

  if (reviews?.length === 0) {
    return <NoData text={"등록된 리뷰가 없어요."} />;
  }

  console.log("reviews ====>", reviews);

  return (
    <>
      <div className="camp-slide-wrap">
        <Slide slidePerview={slidePerview} spaceBetween={10}>
          {reviews?.map((review) => (
            <ReviewSlideCard
              key={review.id}
              review={review}
              onClickFunc={() => handleModalOpen(review)}
            />
          ))}
        </Slide>
      </div>
      <ReviewModal
        isOpen={isOpen}
        selected={selected}
        handleModalClose={handleModalClose}
      />
    </>
  );
};

export default CampReviewSlide;
