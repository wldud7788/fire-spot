import { useState } from "react";

interface MakeStarProps {
  onRatingChange: (rating: number) => void; // 평점 값을 상위 컴포넌트에 전달하는 콜백
}

const MakeStar: React.FC<MakeStarProps> = ({ onRatingChange }) => {
  const [selectedRating, setSelectedRating] = useState<number | null>(null);

  const handleStarClick = (rating: number) => {
    setSelectedRating(rating);
    onRatingChange(rating); // 선택된 평점을 부모 컴포넌트에 전달
  };

  return (
    <div>
      {/* <p>캠핑장 평점</p> */}
      <div className="flex">
        {[1, 2, 3, 4, 5].map((rating) => (
          <svg
            key={rating}
            fill={
              selectedRating && rating <= selectedRating
                ? "orange"
                : "lightgray"
            }
            viewBox="0 0 24 24"
            strokeWidth="2"
            onClick={() => handleStarClick(rating)}
            className="h-6 w-6 cursor-pointer"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
            />
          </svg>
        ))}
      </div>
    </div>
  );
};

export default MakeStar;
