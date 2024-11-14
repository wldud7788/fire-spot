"use client";

import React from "react";
import { Database } from "../../../database.types";

type Review = Database["public"]["Tables"]["review"]["Row"];
type ReviewSlideCardProps = {
  review: Review;
  onClickFunc?: () => void;
};

const ReviewSlideCard: React.FC<ReviewSlideCardProps> = ({ review }) => {
  // 이윤지: 이미지 없는 경우 어떻게 할 지 생각하기
  const imgUrl = review.img.length > 0 ? review.img[0] : "";

  return (
    <div onClick={onClickFunc}>
      <h2>{review.campId}</h2>
      <h3>{review.title}</h3>
      <p>{review.content}</p>
      <p>{review.likes}</p>
      <img src={imgUrl} alt="" />
    </div>
  );
};
export default ReviewSlideCard;
