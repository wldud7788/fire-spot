type StarProps = {
  activeStar: number;
  defaultStar: number;
};

const Star = ({ activeStar, defaultStar }: StarProps) => {
  const TOTAL_STAR = 5;
  const activeStars = Array.from({ length: activeStar });
  const defaultStars = Array.from({ length: TOTAL_STAR - defaultStar });

  return (
    <>
      {activeStars.map((_, index) => {
        return (
          <img
            key={`active-star-${index}`}
            src={`/assets/images/common/ico-star-c.svg`}
            alt={"별 이미지"}
          />
        );
      })}
      {defaultStars.map((_, index) => {
        return (
          <img
            key={`default-star-${index}`}
            src={`/assets/images/common/ico-star.svg`}
            alt={"별 이미지"}
          />
        );
      })}
    </>
  );
};

export default Star;
