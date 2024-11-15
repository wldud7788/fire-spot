"use client";

import React from "react";
import { Database } from "../../../database.types";

type Review = Database["public"]["Tables"]["review"]["Row"];
type ReviewSlideCardProps = {
  review: Review;
  onClickFunc?: () => void;
};

const ReviewSlideCard: React.FC<ReviewSlideCardProps> = ({
  review,
  onClickFunc
}) => {
  // 이윤지: 이미지 없는 경우 어떻게 할 지 생각하기
  const imgUrl = review.img.length > 0 ? review.img[0] : "";
  console.log("review ====>", review);
  return (
    <div
      onClick={onClickFunc}
      className="flex min-h-[245px] flex-col justify-between overflow-hidden rounded-[12px] border border-[#BFBFBF] px-[24px] py-[28px]"
    >
      {/* <h2>{review.campId}</h2> 어디에 사용하는지 모르겠습니다.*/}
      <div>
        <div className="flex items-center">
          <h3 className="text-[16px] font-bold">{review.title}</h3>
        </div>
        <div className="mb-[16px] mt-[12px]">
          <p className="line-clamp-3 text-[14px]">{review.content}</p>
        </div>
      </div>
      <div className="flex items-end justify-between">
        <div className="flex items-center gap-[5px]">
          <p className="color-gray04 text-[14px]">
            좋아요: {review.likes ? review.likes : 0}개
          </p>
          <p className="color-gray04 before-dot-left relative pl-[10px] text-[14px]">
            {review.date}
          </p>
        </div>

        <div className="h-[80px] w-[90px] overflow-hidden rounded-[6px] shadow-custom">
          {imgUrl ? (
            <img src={imgUrl} alt="" className="h-full w-full object-cover" />
          ) : (
            <div className="w-full"></div>
          )}
        </div>
      </div>
    </div>
  );
};
export default ReviewSlideCard;
