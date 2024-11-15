"use client";
import { createClient } from "@/_utils/supabase/client";
import { useLikeStore } from "@/_utils/zustand/useLikeStore";
import { Camp } from "@/app/(pages)/camps/types/Camp";
import { upsertCamp } from "@/app/(pages)/meets/actions/meetWriteAction";
import { CampSelect } from "@/app/(pages)/meets/types/camp.types";
import React, { useEffect, useState } from "react";

interface LikeButtonProps {
  campId: string;
  camp: CampSelect | Camp;
}

const LikeButton: React.FC<LikeButtonProps> = ({ campId, camp }) => {
  const supabase = createClient();
  const [userId, setUserId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const { addLike, removeLike, isLiked } = useLikeStore();
  const Liked = isLiked(campId);

  useEffect(() => {
    const checkLikeStatus = async () => {
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
          console.error("좋아요 상태 확인 오류:", error);
          return;
        }

        if (data) {
          addLike(campId);
        }
      } catch (error) {
        console.error("에러 발생:", error);
      } finally {
        setIsLoading(false);
      }
    };

    checkLikeStatus();
  }, [campId, addLike]);

  const handleToggleLike = async () => {
    if (!userId) {
      alert("로그인이 필요한 서비스입니다.");
      return;
    }

    try {
      await upsertCamp(camp);
      setIsLoading(true);

      if (Liked) {
        const { error } = await supabase
          .from("bookmarks")
          .delete()
          .eq("contentId", parseInt(campId))
          .eq("userId", userId);

        if (error) {
          console.error("좋아요 제거 오류:", error);
          return;
        }

        removeLike(campId);
      } else {
        const { error } = await supabase.from("bookmarks").insert([
          {
            contentId: parseInt(campId),
            userId,
            created_at: new Date().toISOString()
          }
        ]);

        if (error) {
          console.error("좋아요 추가 오류:", error);
          return;
        }

        addLike(campId);
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
    handleToggleLike();
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className="absolute right-[15px] top-[15px] z-30 flex h-[42px] w-[42px] items-center justify-center max-1280:right-[10px] max-1280:top-[10px]"
      disabled={isLoading}
    >
      <img
        src={
          Liked
            ? "/assets/images/camp/btn-camp-like-active.svg"
            : "/assets/images/camp/btn-camp-like.svg"
        }
        alt={Liked ? "좋아요 해제" : "좋아요 추가"}
      />
    </button>
  );
};

export default LikeButton;
