import React from "react";
import Slide from "../slide/Slide";

const MainSlide = () => {
  return (
    <Slide useAutoplay={false} usePagination={false}>
      <div className="flex h-[370px] items-center justify-center bg-[#151515] text-[#fff]">
        슬라이드 1
      </div>
      <div className="flex h-[370px] items-center justify-center bg-[#151515] text-[#fff]">
        슬라이드 2
      </div>
      <div className="flex h-[370px] items-center justify-center bg-[#151515] text-[#fff]">
        슬라이드 3
      </div>
    </Slide>
  );
};

export default MainSlide;
