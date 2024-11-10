"use client";
import { useState } from "react";
import { createClient } from "@/_utils/supabase/client";

// ReviewModalProps 인터페이스: props로 campId와 onClose 함수를 받음
interface ReviewModalProps {
  campId: string; // 리뷰를 작성할 캠핑장 ID
  onClose: () => void; // 모달창을 닫는 함수
}

const ReviewModal: React.FC<ReviewModalProps> = ({ campId, onClose }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [rating, setRating] = useState<number | null>(null);
  const supabase = createClient(); // Supabase 클라이언트 생성

  // Supabase를 통해 현재 사용자 정보 가져오기
  const getUser = async () => {
    const {
      data: { user }
    } = await supabase.auth.getUser();
    return user;
  };

  // 리뷰를 제출하는 함수
  const handleSubmit = async () => {
    const user = await getUser();
    if (!user) {
      alert("로그인이 필요합니다.");
      return;
    }

    try {
      // Supabase의 `review` 테이블에 리뷰 데이터 삽입
      const { data, error } = await supabase.from("review").insert([
        {
          userId: user.id, // 현재 사용자 ID
          campId: campId,
          title: title, // 전달받은 캠핑장 ID
          content: content, // 입력한 리뷰 내용
          rating: rating, // 입력한 평점
          at: new Date().toISOString() // 현재 시간
        }
      ]);

      if (error) throw error;

      alert("리뷰가 성공적으로 작성되었습니다!");
      onClose(); // 모달창 닫기
    } catch (error) {
      console.error("리뷰 작성 중 오류 발생:", error);
      alert("리뷰 작성에 실패했습니다.");
    }
  };

  return (
    <div className="modal">
      <h2>제목</h2>
      <textarea
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="리뷰 제목을 입력하세요"
        className="textarea"
      />
      <h2>내용</h2>
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="리뷰 내용을 입력하세요"
        className="textarea"
      />
      {/* 평점을 입력받는 숫자 입력 필드 */}
      <input
        type="number"
        value={rating || ""}
        onChange={(e) => setRating(parseInt(e.target.value, 10))}
        placeholder="평점 (1-5)"
        className="input"
        min={1}
        max={5}
      />
      {/* 리뷰 제출 버튼 */}
      <button onClick={handleSubmit} className="btn btn-primary">
        제출
      </button>
      {/* 모달창 닫기 버튼 */}
      <button onClick={onClose} className="btn btn-secondary">
        닫기
      </button>
    </div>
  );
};

export default ReviewModal;
