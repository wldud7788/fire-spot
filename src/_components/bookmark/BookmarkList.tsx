"use client";

import { useEffect, useState } from "react";
import React from "react";
import CampCard from "../camp/CampCard";
import BookMarkButton2 from "./BookMarkButton2";
import { createClient } from "@/_utils/supabase/client";
import { Database } from "../../../database.types";
import { CampSelect } from "@/app/(pages)/meets/types/camp.types";
import { getUser } from "@/_utils/auth";

type Bookmark = Database["public"]["Tables"]["bookmarks"]["Row"] & {
  camp: CampSelect;
};

const BookmarkList: React.FC = () => {
  const supabase = createClient();
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // 북마크 데이터를 가져오는 함수
  const fetchBookmarks = async () => {
    try {
      const user = await getUser();
      if (!user) {
        alert("로그인이 필요합니다.");
        return;
      }
      const { data, error } = await supabase
        .from("bookmarks")
        .select("*, camp(*)")
        .eq("userId", user.id);

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
      {bookmarks.length === 0 ? (
        <p>북마크된 캠핑장이 없습니다.</p>
      ) : (
        <ul className="bookmark-list flex flex-wrap items-start gap-[30px]">
          {bookmarks.map((bookmark) => (
            <li
              key={bookmark.contentId}
              className="camp-card-wrapper w-full max-w-[calc(33.333%-23px)]"
            >
              <CampCard camp={bookmark.camp} type="bookmark" />
              <BookMarkButton2
                campId={bookmark.contentId.toString()}
                camp={bookmark.camp}
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
