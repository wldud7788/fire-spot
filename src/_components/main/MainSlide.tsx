import React from "react";
import Slide from "../slide/Slide";

const MainSlide = () => {
  return (
    <Slide useAutoplay={false} usePagination={false}>
      <div className="h-full">
        <img
          className="h-full w-full object-cover"
          src="/assets/images/main/img-main-slider.jpg"
          alt="메인 슬라이드"
        />
      </div>
      <div className="h-full">
        <img
          className="h-full w-full object-cover"
          src="/assets/images/main/img-main-slider.jpg"
          alt="메인 슬라이드"
        />
      </div>
      <div className="h-full">
        <img
          className="h-full w-full object-cover"
          src="/assets/images/main/img-main-slider.jpg"
          alt="메인 슬라이드"
        />
      </div>
    </Slide>
  );
};

export default MainSlide;
