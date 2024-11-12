"use client";

import { useEffect, useState } from "react";
import FeedCard from "../feed/FeedCard";
import { createClient } from "@/_utils/supabase/client";
import { FeedItem } from "@/app/(pages)/feeds/types/Feed";

const supabase = createClient();

const MainReviews = () => {
  const [reviews, setReviews] = useState<FeedItem[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // 함수 이름도 fetchCamps -> fetchReviews 이름 바꾸쇼
    const fetchCamps = async () => {
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

      const selectedCamps = getRandomCamps(data || [], 5);
      // const selectedCamps = data;
      setReviews(selectedCamps);
      setError(null);
    };

    fetchCamps();
  }, []);

  // TODO 매개변수 이름 camps -> reviews
  const getRandomCamps = (reviews: FeedItem[], n: number): FeedItem[] => {
    const existImgReviews = reviews.filter(
      (review) => !!review.camp?.firstImageUrl
    );

    const shuffled = [...existImgReviews].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, n);
  };

  return (
    <div>
      {error && <p className="text-red-500">{error}</p>}
      <ul className="mb-[40px] mt-[50px] flex items-center justify-center gap-[20px]">
        {reviews.map((feed) => (
          <li key={feed.id}>
            <FeedCard feed={feed} type={"main"} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MainReviews;
