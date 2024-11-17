import React, { useEffect } from "react";
import Modal from "../modal/Modal";
import { ReviewItem } from "@/app/(pages)/reviews/types/ReviewItem";
import Link from "next/link";
import Star from "../star/Star";

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
      <div>
        <h2 className="color-gray01 block text-center text-[24px] font-bold max-1280:text-[22px] max-767:text-[18px]">
          후기
        </h2>

        <div className="user_area mt-[10px] flex items-center gap-[10px] pt-[10px]">
          <div className="user_img h-[36px] w-[36px] overflow-hidden rounded-[100%]">
            <Link href={`/profile/${selected?.profile?.id}`}>
              {/* 프로필 이미지 */}
              {selected?.profile?.avatar_url ? (
                <img
                  src={selected?.profile?.avatar_url}
                  alt=""
                  className="h-full w-full object-cover"
                />
              ) : (
                <img src="/assets/images/ico-avatar.svg" alt="" />
              )}
            </Link>
          </div>
          <div className="user_info flex flex-col">
            <div className="color-gray01 line-clamp-1 w-full text-[14px]">
              {selected?.profile?.nickname || selected?.profile?.user_name} 님의
              후기입니다.
            </div>
            <p className="text-[16px] font-bold">
              <Star
                activeStar={selected?.rating || 0}
                defaultStar={selected?.rating || 0}
              />
            </p>{" "}
          </div>
        </div>
      </div>
      <div className="mt-[15px] border-t border-[#d9d9d9] pt-[15px]">
        {/* <button>좋아요 버튼</button> */}
        {/* {selected?.likes ? (
          <p>좋아요 수 0개</p>
        ) : (
          <p>{selected?.likes}개 좋아요함</p>
        )} */}
        {/* 캠핑장명 */}
        <p className="text-[16px] font-bold">
          {selected?.camp?.facltNm}
          {/* 별점 */}
        </p>{" "}
        <p className="color-gray02 mb-[15px] mt-[5px] bg-location bg-left-center-0 bg-no-repeat pl-[20px] text-[13px]">
          {selected?.camp?.addr1}
        </p>{" "}
        {/* 주소 */}
        <h2 className="text-[18px] font-bold">{selected?.title}</h2>{" "}
        {/* 후기제목 */}
        <p className="color-gray01 text-[14px]">{selected?.content}</p>{" "}
        {/* 후기내용 */}
        <img src={selected?.img[0] || ""} alt="" />
        {/* 후기 사진 */}
      </div>
    </Modal>
  );
};

export default ReviewModal;
