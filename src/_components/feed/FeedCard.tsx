"use client";
import React, { useEffect, useState } from "react";
import FeedCard from "@/_components/feed/FeedCard";
import { FeedItem } from "@/app/(pages)/feeds/types/Feed";
import { supabase } from "@/lib/supabaseClient"; // Supabase 클라이언트를 불러옵니다.

const CampingReviews = () => {
  const [feeds, setFeeds] = useState<FeedItem[]>([]);

  useEffect(() => {
    // Supabase에서 데이터 가져오는 함수
    const fetchFeeds = async () => {
      const { data, error } = await supabase
        .from("feed") // 테이블 이름을 "feed"로 가정합니다.
        .select("profileImg, userName, time, desc");

      if (error) {
        console.error("Error fetching feeds:", error);
      } else if (data) {
        setFeeds(data as FeedItem[]);
      }
    };

    fetchFeeds();
  }, []);

  return (
    <div>
      <h2>캠핑후기 목록이 표시됩니다.</h2>
      {/* feeds 배열을 map으로 순회하여 FeedCard 컴포넌트를 렌더링 */}
      {feeds.map((feed, index) => (
        <FeedCard key={index} feed={feed} />
      ))}
    </div>
  );
};

export default CampingReviews;
