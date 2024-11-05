"use client";
import { Camp } from "@/app/(pages)/camps/types/Camp";
import { useEffect, useState } from "react";
import { createClient } from "@/_utils/supabase/client";
import React from "react";

// 캠핑장 API에서 캠핑장 이름을 가져오는 함수
async function fetchCampingSiteName(contentId: number): Promise<string> {
  try {
    // 캠핑장 API에서 데이터를 가져옵니다
    const response = await fetch(`../../api/campApi?contentId=${contentId}`);
    if (!response.ok)
      throw new Error("캠핑장 정보를 가져오는 데 실패했습니다.");

    const data = await response.json();

    // API 응답 데이터 확인 (콘솔 로그)
    console.log(`캠핑장 ID: ${contentId}`, data);

    // 캠핑장 이름
    return data.facltNm || "알 수 없음"; // 기본 이름 설정
  } catch (error) {
    console.error("Error fetching camping site name:", error);
    return "알 수 없음"; // 실패 시 기본 이름 반환
  }
}

interface Bookmark {
  contentId: number;
  campName: string;
}

const Bookmarks: React.FC = () => {
  const supabase = createClient();
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // 북마크 데이터를 가져오는 함수
  const fetchBookmarks = async () => {
    try {
      const { data, error } = await supabase
        .from("bookmarks")
        .select("contentId");

      if (error) throw error;

      if (!data || data.length === 0) {
        console.warn("북마크 데이터가 없습니다.");
        setBookmarks([]);
        return;
      }

      // 북마크 데이터에서 캠핑장 이름을 API를 통해 가져옴
      const fetchedBookmarks = await Promise.all(
        data.map(async (item: { contentId: number }) => {
          const campName = await fetchCampingSiteName(item.contentId);
          return { contentId: item.contentId, campName };
        })
      );

      setBookmarks(fetchedBookmarks);
    } catch (error) {
      console.error("북마크 데이터를 가져오는 중 오류 발생:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookmarks();
  }, []);

  if (loading) return <div>로딩 중...</div>;

  return (
    <div>
      <h2>북마크 목록</h2>
      {bookmarks.length === 0 ? (
        <p>북마크된 캠핑장이 없습니다.</p>
      ) : (
        <ul>
          {bookmarks.map((bookmark) => (
            <li key={bookmark.contentId}>{bookmark.campName}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Bookmarks;

// comtentId값만 지금 콘솔에 찍히는데 어떻게하쥐...
// 북마크된 캠핑장 이름, id값 이런거 다 supabase에 넣어야하나? 흠
