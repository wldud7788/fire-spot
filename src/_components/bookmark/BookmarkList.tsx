"use client";

import { useEffect, useState } from "react";
import React from "react";
import CampCard from "../camp/CampCard";
import BookmarkButton from "../bookmark/BookmarkButton"; // 북마크 버튼 import
import { createClient } from "@/_utils/supabase/client";

interface Bookmark {
  contentId: string;
}

const BookmarkList: React.FC = () => {
  const supabase = createClient();
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // 북마크 데이터를 가져오는 함수
  const fetchBookmarks = async () => {
    try {
      const { data, error } = await supabase
        .from("bookmarks")
        .select("*, camp(*)");
      console.log(data);

      if (error) throw error;
      if (!data || data.length === 0) {
        setBookmarks([]);
        return;
      }
      setBookmarks(data as Bookmark[]);
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
        <div className="bookmark-list">
          {bookmarks.map((bookmark) => (
            <div key={bookmark.contentId} className="camp-card-wrapper">
              <CampCard
                camp={{
                  contentId: bookmark.contentId,
                  facltNm: bookmark.camp.facltNm,
                  firstImageUrl: bookmark.camp.firstImageUrl,
                  featureNm: bookmark.camp.featureNm,
                  intro: bookmark.camp.intro,
                  addr1: bookmark.camp.addr1,
                  induty: bookmark.camp.induty
                }}
                type="bookmark"
              />
              {/* 북마크 제거 버튼 추가 */}
              <BookmarkButton contentId={bookmark.contentId} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BookmarkList;
