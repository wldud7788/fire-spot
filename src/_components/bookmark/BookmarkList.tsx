"use client";

import { useEffect, useState } from "react";
import React from "react";
import CampCard from "../camp/CampCard";
import BookmarkButton from "../bookmark/BookmarkButton";
import { createClient } from "@/_utils/supabase/client";
import { Database } from "../../../database.types";
import { Camp } from "@/app/(pages)/camps/types/Camp";
import { CampSelect } from "@/app/(pages)/meets/types/camp.types";

// interface Bookmark {
//   contentId: string;
//   camp: {
//     facltNm: string;
//     firstImageUrl: string;
//     intro: string;
//     addr1: string;
//     induty: string;
//   };
//   featureNm: string;
// }
// type Camp = Database["public"]["Tables"]["camp"]["Row"];
type Bookmark = Database["public"]["Tables"]["bookmarks"]["Row"] & {
  camp: CampSelect;
  // featureNm: string;
};

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

  // 북마크 제거 후 목록 업데이트 함수
  const handleBookmarkRemoved = (contentId: string) => {
    setBookmarks((prevBookmarks) =>
      prevBookmarks.filter(
        (bookmark) => bookmark.contentId !== Number(contentId)
      )
    );
  };

  useEffect(() => {
    fetchBookmarks();
  }, []);

  if (loading) return <div>로딩 중...</div>;

  return (
    <div>
      {bookmarks.length === 0 ? (
        <p>북마크된 캠핑장이 없습니다.</p>
      ) : (
        <ul className="bookmark-list flex flex-wrap items-start gap-[30px]">
          {bookmarks.map((bookmark) => (
            <li
              key={bookmark.contentId}
              className="camp-card-wrapper w-full max-w-[calc(33.333%-23px)]"
            >
              <CampCard
                camp={bookmark.camp}
                // camp={{
                //   contentId:bookmark.contentId || 0,
                //   facltNm: bookmark.camp.facltNm || "",
                //   firstImageUrl: bookmark.camp.firstImageUrl || "",
                //   featureNm: bookmark.featureNm || "",
                //   intro: bookmark.camp.intro || "",
                //   addr1: bookmark.camp.addr1 || "",
                //   induty: bookmark.camp.induty || ""
                // }}
                type="bookmark"
              />
              {/* 북마크 제거 버튼에 handleBookmarkRemoved 전달 */}
              <BookmarkButton
                contentId={`${bookmark.contentId}`}
                onBookmarkRemoved={handleBookmarkRemoved}
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default BookmarkList;

// 수퍼베이스랑 공공데이터의 타입이 맞지 않음 -> 오류 발생
