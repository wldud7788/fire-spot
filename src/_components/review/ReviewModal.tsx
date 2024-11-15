import React, { useEffect } from "react";
import Modal from "../modal/Modal";
import { ReviewItem } from "@/app/(pages)/reviews/types/ReviewItem";

interface ReviewModalProps {
  selected: ReviewItem | null;
  isOpen: boolean;
  handleModalClose: () => void;
}
const ReviewModal: React.FC<ReviewModalProps> = ({
  isOpen,
  handleModalClose,
  selected
}) => {
  return (
    <Modal
      modalType={""}
      width={"500"}
      isOpen={isOpen}
      onClose={handleModalClose}
    >
      {/* 프로필 이미지 */}
      {selected?.profile?.avatar_url ? (
        <img
          src={selected?.profile?.avatar_url}
          alt=""
          className="object-fit h-8 w-8 rounded-full"
        />
      ) : (
        <img src="/assets/images/ico-avatar.svg" alt="" />
      )}
      {/* 작성자 닉네임 */}
      <p>
        {selected?.profile?.nickname || selected?.profile?.user_name}님의
        후기입니다.
      </p>
      <button>좋아요 버튼</button>
      {selected?.likes ? (
        <p>좋아요 수 0개</p>
      ) : (
        <p>{selected?.likes}개 좋아요함</p>
      )}
      <p>{selected?.camp?.facltNm}</p> {/* 캠핑장명 */}
      <span>{selected?.camp?.addr1}</span> {/* 주소 */}
      <span>{selected?.rating}</span> {/* 별점 */}
      <h2> {selected?.title}</h2> {/* 후기제목 */}
      <p>{selected?.content}</p> {/* 후기내용 */}
    </Modal>
  );
};

export default ReviewModal;
