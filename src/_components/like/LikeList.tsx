"use client";
import { useEffect, useState } from "react";
import React from "react";
import CampCard from "../camp/CampCard";
import { createClient } from "@/_utils/supabase/client";
import { Database } from "../../../database.types";
import { CampSelect } from "@/app/(pages)/meets/types/camp.types";
import { getUser } from "@/_utils/auth";
import LikeButton from "./LikeButton";
import NoData from "../common/NoData";

type Like = Database["public"]["Tables"]["bookmarks"]["Row"] & {
  camp: CampSelect;
};

const LikeList: React.FC = () => {
  const supabase = createClient();
  const [Likes, setLikes] = useState<Like[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // 좋아요 데이터를 가져오는 함수
  const fetchlikes = async () => {
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
        setLikes([]);
        return;
      }
      setLikes(data as Like[]);
    } catch (error) {
      console.error("좋아요 데이터를 가져오는 중 오류 발생:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchlikes();
  }, []);

  if (loading) return <div>로딩 중...</div>;

  return (
    <div>
      {Likes.length === 0 ? (
        <NoData text={"좋아요한 캠핑이 없어요."} />
      ) : (
        <ul className="like-list flex flex-wrap items-start gap-[30px] max-1280:gap-[15px]">
          {Likes.map((Like) => (
            <li
              key={Like.contentId}
              className="camp-card-wrapper w-full max-w-[calc(33.333%-23px)] max-1280:max-w-[calc(33.333%-10px)] max-767:max-w-[calc(50%-8px)] max-450:max-w-[100%]"
            >
              <CampCard camp={Like.camp} type="like" />
              <LikeButton campId={Like.contentId.toString()} camp={Like.camp} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default LikeList;
