"use client";

import { useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

type SlideProps = {
  slidePerview?: number;
  spaceBetween?: number;
  onChangeEvent?: () => void;
  useAutoplay?: boolean;
  useNavigation?: boolean;
  usePagination?: boolean;
};

// props는 해당 컴포넌트에서 직접 값을 정의함
const Slide = ({
  slidePerview,
  spaceBetween,
  onChangeEvent,
  useAutoplay = true,
  useNavigation = true,
  usePagination = true
}: SlideProps) => {
  useEffect(() => {
    // 페이지에서 SSR로 랜더링 시 커스텀 훅으로 생성해서 전달 받아야함
    if (onChangeEvent) onChangeEvent();
  }, [onChangeEvent]);

  const dummyData = [
    { id: 1, name: "slide 1" },
    { id: 2, name: "slide 2" },
    { id: 3, name: "slide 3" },
    { id: 4, name: "slide 4" }
  ];

  // 활성화할 모듈을 조건부로 설정
  const modules = [
    ...(useAutoplay ? [Autoplay] : []),
    ...(useNavigation ? [Navigation] : []),
    ...(usePagination ? [Pagination] : [])
  ];

  return (
    <Swiper
      spaceBetween={spaceBetween}
      slidesPerView={slidePerview}
      onSlideChange={onChangeEvent}
      loop={false}
      autoplay={useAutoplay}
      modules={modules}
      navigation
      pagination={{ clickable: true }}
      className="h-[300px] w-full"
    >
      {dummyData.map((data) => (
        <SwiperSlide
          key={data.id}
          className="flex items-center justify-center bg-gray-200"
        >
          {data.name}
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Slide;
