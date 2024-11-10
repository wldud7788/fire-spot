"use client";

import React from "react";

type Review = {
  id: number;
  campId: string;
  title: string;
  content: string;
  likes: number;
};

type ReviewSlideCardProps = {
  review: Review;
};

const ReviewSlideCard: React.FC<ReviewSlideCardProps> = ({ review }) => {
  return (
    <div>
      <h2>{review.campId}</h2>
      <h3>{review.title}</h3>
      <p>{review.content}</p>
      <p>{review.likes}</p>
    </div>
  );
};
export default ReviewSlideCard;
