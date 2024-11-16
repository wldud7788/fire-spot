"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/_utils/supabase/client";
import ReviewCard from "../review/ReviewCard";
import { ReviewItem } from "@/app/(pages)/reviews/types/ReviewItem";
import ReviewModal2 from "../review/ReviewModal";

const supabase = createClient();

const MainReviews = () => {
  const [reviews, setReviews] = useState<ReviewItem[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<ReviewItem | null>(null);
  const handleModalOpen = (review: ReviewItem) => {
    setSelected(review);
    setIsOpen(true);
  };
  const handleModalClose = () => {
    setIsOpen(false);
    setSelected(null);
  };

  useEffect(() => {
    // 함수 이름도 fetchCamps -> fetchReviews 이름 바꾸쇼
    const fetchReviews = async () => {
      // const { data, error } = await supabase.from("review").select("*") as { data: FeedItem[] | null, error: Error | null };
      const { data, error } = await supabase
        .from(`review`)
        .select(`*, camp(*), profile(*)`); // as unknown as FeedItem[]
      console.log(data);

      if (error) {
        // console.error("캠핑장 목록을 가져오는 중 오류 발생:", error);
        throw new Error("리뷰 정보를 가져오는 중 오류 발생:", error);
      }

      if (!data) {
        throw new Error("리뷰 정보를 가져오는 중 오류 발생 (데이터없음)");
      }

      console.log("data", data);
      // const reviewItems = data as ReviewItem[] | null;
      const selectedCamps = getRandomCamps(data || [], 5);
      // const selectedCamps = data;
      setReviews(selectedCamps);
      setError(null);
    };

    fetchReviews();
  }, []);

  // TODO 매개변수 이름 camps -> reviews
  const getRandomCamps = (reviews: ReviewItem[], n: number): ReviewItem[] => {
    const existImgReviews = reviews.filter(
      (review) => !!review.camp?.firstImageUrl
    );

    const shuffled = [...existImgReviews].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, n);
  };

  return (
    <div>
      {error && <p className="text-red-500">{error}</p>}
      <ul className="mb-[40px] mt-[50px] flex items-center justify-center gap-[20px] max-989:flex-wrap">
        {reviews.map((review) => (
          <li
            key={review.id}
            className="w-[calc(20%-10px)] max-989:flex-[1_0_25%] max-767:flex-[1_0_45%] max-450:flex-[1_0_100%]"
          >
            <ReviewCard
              feed={review}
              type={"main"}
              onClickFunc={() => handleModalOpen(review)}
            />
          </li>
        ))}
      </ul>
      {/* 리뷰 카드 클릭 시 생성되는 모달창 */}
      <ReviewModal2
        isOpen={isOpen}
        handleModalClose={handleModalClose}
        selected={selected}
      />
    </div>
  );
};

export default MainReviews;
