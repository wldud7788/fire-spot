"use client";
import { createClient } from "@/_utils/supabase/client";
import { ChangeEvent, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import MakeStar from "../star/MakeStar";

interface ReviewModalProps {
  campId: string;
  onClose: () => void;
}

const ReviewWriteModal: React.FC<ReviewModalProps> = ({ campId, onClose }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [rating, setRating] = useState<number>(0);
  const queryClient = useQueryClient();
  const [isOff, setIsOff] = useState(true);

  const [reviewUrl, setReviewUrl] = useState<string | null>(null);

  const supabase = createClient();

  const ToggleButtonOnOff = () => {
    const [isOff, setIsOff] = useState(true);
  };
  const getUser = async () => {
    const {
      data: { user }
    } = await supabase.auth.getUser();
    return user;
  };

  const handleSubmit = async () => {
    const user = await getUser();
    if (!user) {
      alert("로그인이 필요합니다.");
      return;
    }

    try {
      const img: string[] = reviewUrl ? [reviewUrl] : [];
      const { data, error } = await supabase.from("review").insert([
        {
          userId: user.id,
          campId: Number(campId),
          title: title,
          content: content,
          rating: rating,
          img: img,
          at: new Date().toISOString(),
          date: new Date().toISOString()
        }
      ]);

      if (error) throw error;
      queryClient.invalidateQueries({
        queryKey: ["reviewList", campId]
      });
      alert("리뷰가 성공적으로 작성되었습니다!");
      onClose();
    } catch (error) {
      console.error("리뷰 작성 중 오류 발생:", error);
      alert("리뷰 작성에 실패했습니다.");
    }
  };

  const onRatingChange = (rating: number) => {
    setRating(rating);
  };

  const handleChangeReviewImageUrl = async (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    const imgUrl = e.target.files?.[0];
    await handleReviewImageUpdate(imgUrl);
  };

  const handleReviewImageUpdate = async (img: File | undefined) => {
    if (!img) return;
    const user = await getUser();
    const userId = user?.id;

    try {
      const filePath = `${campId}-${Date.now()}`;

      console.log("filePath", filePath);

      // 파일 업로드
      const { error: uploadError } = await supabase.storage
        .from("review")
        .upload(filePath, img, {
          contentType: img.type
        });

      if (uploadError) {
        console.error("Error uploading image:", uploadError.message);
        return;
      }

      const { data: publicURL } = supabase.storage
        .from("review")
        .getPublicUrl(filePath);

      if (!publicURL || !publicURL.publicUrl) {
        console.error("Error getting public URL");
        return;
      }

      const uploadedImageUrl = publicURL.publicUrl;
      setReviewUrl(uploadedImageUrl);
    } catch (error) {
      console.error("Error handling profile image:", error);
    }
  };

  return (
    <>
      <div className="modal z-50 bg-white">
        <h2>별점</h2>
        <MakeStar onRatingChange={onRatingChange} />

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
        <input
          type="file"
          accept="image/*"
          onChange={(e) => handleChangeReviewImageUrl(e)}
          className="block"
        />
        <button onClick={handleSubmit}>제출</button>
        <button onClick={onClose}>닫기</button>

        <button onClick={() => setIsOff(!isOff)}>{isOff ? "ON" : "OFF"}</button>
      </div>

      {!isOff && (
        <div>
          <p>
            다음 금지행위에 해당되는 리뷰는 서비스 이용 약관 제25조에 따라
            고객에게 통보 없이 삭제 또는 블라인드 될 수 있습니다. 보다 자세한
            내용은 고객센터 Q&A에서 확인하실 수 있습니다.
          </p>
          <h3>리뷰 작성 시 금지행위</h3>
          <ul>
            <li>
              1. 특정 내용의 리뷰 작성 조건으로 대가를 제공받고 이를 표시하지
              않거나, 기타 특정업체의 영리적 목적을 위하여 리뷰를 게시한 경우
            </li>
            <li>2. 동일 상품에 대해 반복적 리뷰 게시</li>
            <li>
              3. 허위/과장된 내용 또는 직접 작성하지 않았거나 캠핑장과 관련 없는
              내용 게시
            </li>
            <li>
              4. 정당한 권한 없이 타인의 권리 등(개인정보, 지식재산권, 소유권,
              명예, 신용 등)을 침해하는 내용 게시
            </li>
            <li>
              5. 욕설, 폭언, 비방 등 타인에 불쾌하거나 위협이 되는 내용 게시
            </li>
            <li>
              6. 음란물 또는 청소년 유해 매체물, 범죄행위나 불법적인 행동을 전시
              또는 조장하는 내용 게시
            </li>
            <li>
              7. 정보통신기기의 오작동을 일으킬 수 있는 악성코드나 데이터를
              포함하는 리뷰 게시
            </li>
            <li>8. 사기성 상품, 서비스, 사업 계획 등을 판촉하는 리뷰 게시</li>
            <li>9. 기타 관련법령 및 이용약관, 운영정책에 위배되는 리뷰 게시</li>
          </ul>
        </div>
      )}
    </>
  );
};

export default ReviewWriteModal;
