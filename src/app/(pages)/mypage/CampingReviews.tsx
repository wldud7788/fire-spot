import { useState, useEffect } from "react";
import { createClient } from "@/_utils/supabase/client"; // Supabase 클라이언트 가져오기
import ReviewModal from "@/_components/modal/ReviewModal";
import ReviewCard from "@/_components/review/ReviewCard";
import { CampSelect } from "../meets/types/camp.types";
import useUser from "@/_hooks/useUser";
import { getUser } from "@/_utils/auth";
import { useQuery } from "@tanstack/react-query";
import { User } from "@supabase/supabase-js";
import { ReviewItem } from "../reviews/types/ReviewItem";
import NoData from "@/_components/common/NoData";

const supabase = createClient();

const CampListPage = () => {
  // 선택된 캠핑장 contentId를 저장하는 상태 변수
  const [selectedCampId, setSelectedCampId] = useState<string | null>(null);
  // 캠핑장 목록 데이터를 저장하는 상태 변수
  const [camps, setCamps] = useState<CampSelect[]>([]);

  // 1. type import
  const [reviews, setReviews] = useState<ReviewItem[]>([]);
  const user = useUser();
  const userId = user?.id ?? "";

  // const { data: user, error } = useQuery<User | null>({
  //   queryKey: ["user"],
  //   queryFn: () => getUser()
  // });

  // const userId = user?.id || "";

  // Supabase에서 캠핑장 목록 가져오기
  useEffect(() => {
    // 함수 이름도 fetchCamps -> fetchReviews 이름 바꾸쇼

    console.log("user", user);

    const fetchReviews = async () => {
      if (user) {
        const { data, error } = await supabase
          .from(`review`)
          .select(`*, camp(*), profile(*)`)
          .eq("userId", userId); // 2. 실제 로그인한 userId 넣으셈 (getUser, useUser 쓰면 됨 전체 검색(ctrl + shift + f 해서 검색))

        if (error) {
          // console.error("캠핑장 목록을 가져오는 중 오류 발생:", error);
          throw new Error("리뷰 정보를 가져오는 중 오류 발생:" + error.message);
        }

        if (!data) {
          throw new Error("리뷰 정보를 가져오는 중 오류 발생 (데이터없음)");
        }

        const reviewItems = data as ReviewItem[];
        console.log("data", data);

        setReviews(data);
      }
    };

    fetchReviews();
  }, [user]);

  // 리뷰쓰기 모달창을 열기
  const openReviewModal = (campId: string) => {
    setSelectedCampId(campId);
  };

  // 리뷰쓰기 모달창을 닫기
  const closeReviewModal = () => {
    setSelectedCampId(null);
  };

  return (
    <div>
      {reviews.length > 0 ? (
        <>
          {/* 캠핑장 목록 */}
          {reviews.map((review) => {
            return (
              <ReviewCard
                key={review.id}
                feed={{
                  id: review.id,
                  likes: review.likes,
                  title: review.title,
                  updated: review.updated,
                  userId: review.userId,
                  camp: review.camp,
                  profile: review.profile,
                  rating: review.rating,
                  at: review.at,
                  content: review.content
                }}
                // onClickFunc를 전달하여 이름 클릭 시 openReviewModal 실행
                onClickFunc={() => openReviewModal(String(review.campId))} // <- 수정된 부분
              />
            );
          })}
        </>
      ) : (
        <NoData text="작성한 리뷰가 없습니다." />
      )}

      {/* 리뷰쓰기 모달창 */}
      {selectedCampId && (
        <ReviewModal campId={selectedCampId} onClose={closeReviewModal} />
      )}
    </div>
  );
};

export default CampListPage;
