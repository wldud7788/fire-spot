import { useState, useEffect } from "react";
import { createClient } from "@/_utils/supabase/client"; // Supabase 클라이언트 가져오기
import ReviewModal from "./ReviewModal";
import FeedCard from "@/_components/feed/FeedCard";

const supabase = createClient();

const CampListPage = () => {
  // 선택된 캠핑장 contentId를 저장하는 상태 변수
  const [selectedCampId, setSelectedCampId] = useState<string | null>(null);
  // 캠핑장 목록 데이터를 저장하는 상태 변수
  const [camps, setCamps] = useState<
    { contentId: string; facltNm: string; firstImageUrl: string }[]
  >([]);

  // Supabase에서 캠핑장 목록 가져오기
  useEffect(() => {
    const fetchCamps = async () => {
      // Supabase 쿼리: camp 테이블에서 contentId와 facltNm 필드 선택
      const { data, error } = await supabase.from("camp").select("*");
      if (error) {
        console.error("캠핑장 목록을 가져오는 중 오류 발생:", error);
      } else {
        setCamps(data || []);
      }
    };

    fetchCamps();
  }, []);

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
      <h1>캠핑장 목록</h1>

      {/* 캠핑장 목록 */}
      {camps.map((camp) => {
        return (
          <FeedCard
            key={camp.contentId}
            feed={{
              id: Number(camp.contentId),
              profileImg: "이미지 URL 또는 기본 이미지",
              userName: camp.facltNm,
              time: new Date("업데이트된 시간 또는 고정 시간").getTime(),
              desc: "캠핑장 설명 또는 더 자세한 정보",
              img: "이미지 URL",
              firstImageUrl: camp.firstImageUrl,
              like: 0,
              title: "캠핑장 이름",
              date: new Date().toLocaleDateString()
            }}
            // onClickFunc를 전달하여 이름 클릭 시 openReviewModal 실행
            onClickFunc={() => openReviewModal(camp.contentId)} // <- 수정된 부분
          />
        );
      })}

      {/* 리뷰쓰기 모달창 */}
      {selectedCampId && (
        <ReviewModal campId={selectedCampId} onClose={closeReviewModal} />
      )}
    </div>
  );
};

export default CampListPage;
