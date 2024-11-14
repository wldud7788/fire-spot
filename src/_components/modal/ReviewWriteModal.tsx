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

  const [reviewUrl, setReviewUrl] = useState<string | null>(null);

  const supabase = createClient();

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

      <button onClick={handleSubmit} className="btn btn-primary">
        제출
      </button>
      <button onClick={onClose} className="btn btn-secondary">
        닫기
      </button>
    </div>
  );
};

export default ReviewWriteModal;
