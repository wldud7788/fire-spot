import { useState, useEffect } from "react";
import { createClient } from "@/_utils/supabase/client"; // Supabase 클라이언트 가져오기
import ReviewModal from "./ReviewModal";
import FeedCard from "@/_components/feed/FeedCard";

const supabase = createClient();

const CampListPage = () => {
  // 선택된 캠핑장 contentId를 저장하는 상태 변수
  const [selectedCampId, setSelectedCampId] = useState<string | null>(null);
  // 캠핑장 목록 데이터를 저장하는 상태 변수
  const [camps, setCamps] = useState<{ contentId: string; facltNm: string }[]>(
    []
  );

  // Supabase에서 캠핑장 목록 가져오기
  useEffect(() => {
    const fetchCamps = async () => {
      // Supabase 쿼리: camp 테이블에서 contentId와 facltNm 필드 선택
      const { data, error } = await supabase
        .from("camp")
        .select("cntentId, facltNm");
      if (error) {
        console.error("캠핑장 목록을 가져오는 중 오류 발생:", error);
      } else {
        setCamps(data || []);
      }
    };

    fetchCamps();
  }, []);

  // 리뷰쓰기 모달창을 여는 함수
  const openReviewModal = (campId: string) => {
    setSelectedCampId(campId); // 선택된 contentId 설정
  };

  // 리뷰쓰기 모달창을 닫는 함수
  const closeReviewModal = () => {
    setSelectedCampId(null); // 선택된 contentId 초기화 (모달창 닫기)
  };

  return (
    <div>
      <h1>캠핑장 목록</h1>

      {/* Supabase에서 가져온 캠핑장 목록 렌더링 */}
      {camps.map((camp) => {
        return (
          <FeedCard
            key={camp.contentId}
            feed={{
              id: Number(camp.contentId), // id: number로 변환
              profileImg: "이미지 URL 또는 기본 이미지",
              userName: camp.facltNm,
              time: "업데이트된 시간 또는 고정 시간",
              desc: "캠핑장 설명 또는 더 자세한 정보",
              img: ["이미지 URL"], // img는 문자열 배열이므로, 배열로 제공
              like: 0 // 좋아요 수 (초기값 설정)
            }}
            // type="default" // 필요에 따라 type 설정
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
