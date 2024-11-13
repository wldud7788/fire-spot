"use client";
import { createClient } from "@/_utils/supabase/client";
import { useBookmarkStore } from "@/_utils/zustand/useBookmarkStore";
import { Camp } from "@/app/(pages)/camps/types/Camp";
import { upsertCamp } from "@/app/(pages)/meets/actions/meetWriteAction";
import { CampSelect } from "@/app/(pages)/meets/types/camp.types";
import React, { useEffect, useState } from "react";

interface BookMarkButton2Props {
  campId: string;
  camp: CampSelect | Camp;
}

const BookMarkButton2: React.FC<BookMarkButton2Props> = ({ campId, camp }) => {
  const supabase = createClient();
  const [userId, setUserId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const { addBookmark, removeBookmark, isBookmarked } = useBookmarkStore();
  const bookmarked = isBookmarked(campId);

  useEffect(() => {
    const checkBookmarkStatus = async () => {
      try {
        const {
          data: { session }
        } = await supabase.auth.getSession();

        if (!session) {
          setIsLoading(false);
          return;
        }

        setUserId(session.user.id);

        const { data, error } = await supabase
          .from("bookmarks")
          .select("*")
          .eq("contentId", parseInt(campId))
          .eq("userId", session.user.id)
          .single();

        if (error && error.code !== "PGRST116") {
          console.error("북마크 상태 확인 오류:", error);
          return;
        }

        if (data) {
          addBookmark(campId);
        }
      } catch (error) {
        console.error("에러 발생:", error);
      } finally {
        setIsLoading(false);
      }
    };

    checkBookmarkStatus();
  }, [campId, addBookmark]);

  const handleToggleBookmark = async () => {
    if (!userId) {
      alert("로그인이 필요한 서비스입니다.");
      return;
    }

    try {
      upsertCamp(camp);
      setIsLoading(true);

      if (bookmarked) {
        const { error } = await supabase
          .from("bookmarks")
          .delete()
          .eq("contentId", parseInt(campId))
          .eq("userId", userId);

        if (error) {
          console.error("북마크 제거 오류:", error);
          return;
        }

        removeBookmark(campId);
      } else {
        const { error } = await supabase.from("bookmarks").insert([
          {
            contentId: parseInt(campId),
            userId,
            created_at: new Date().toISOString()
          }
        ]);

        if (error) {
          console.error("북마크 추가 오류:", error);
          return;
        }

        addBookmark(campId);
      }
    } catch (error) {
      console.error("에러 발생:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    handleToggleBookmark();
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className="absolute right-[15px] top-[15px] z-50 flex h-[30px] w-[30px] items-center justify-center"
      disabled={isLoading}
    >
      <img
        src={
          bookmarked
            ? "/assets/images/camp/ico-camp-list-bookmark-on.svg"
            : "/assets/images/camp/ico-camp-list-bookmark.svg"
        }
        alt={bookmarked ? "북마크 해제" : "북마크 추가"}
      />
    </button>
  );
};

export default BookMarkButton2;
