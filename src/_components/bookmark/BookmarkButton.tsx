"use client";

import { createClient } from "@/_utils/supabase/client";
import { useState, useEffect } from "react";

interface BookmarkButtonProps {
  contentId: string;
  onBookmarkRemoved: (contentId: string) => void; // 상위 컴포넌트에서 전달받은 콜백
}

const BookmarkButton: React.FC<BookmarkButtonProps> = ({
  contentId,
  onBookmarkRemoved
}) => {
  const supabase = createClient();
  const [isBookmarked, setIsBookmarked] = useState<boolean>(true); // 기본값을 true로 설정

  const handleRemoveBookmark = async () => {
    try {
      const { error } = await supabase
        .from("bookmarks")
        .delete()
        .eq("contentId", contentId);

      if (error) {
        console.error("북마크 제거 오류:", error);
        return;
      }

      setIsBookmarked(false);
      onBookmarkRemoved(contentId); // 상위 컴포넌트에 변경 사항 알림
    } catch (error) {
      console.error("에러 발생:", error);
    }
  };

  if (!isBookmarked) return null; // 북마크가 제거되면 버튼을 렌더링하지 않음

  return (
    <button onClick={handleRemoveBookmark} className="remove-bookmark-btn">
      북마크 제거
    </button>
  );
};

export default BookmarkButton;
