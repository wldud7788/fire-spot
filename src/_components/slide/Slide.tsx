"use client";

import { ReactNode, useEffect } from "react";
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
  children: ReactNode;
};

// props는 해당 컴포넌트에서 직접 값을 정의함
const Slide = ({
  slidePerview,
  spaceBetween,
  onChangeEvent,
  useAutoplay = true,
  useNavigation = true,
  usePagination = true,
  children // children 사용하여, 안쪽 컨텐츠가 자유롭게 적용할 수 있게 함
}: SlideProps) => {
  useEffect(() => {
    // 페이지에서 SSR로 랜더링 시 커스텀 훅으로 생성해서 전달 받아야함
    if (onChangeEvent) onChangeEvent();
  }, [onChangeEvent]);

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
      className="w-full"
    >
      {Array.isArray(children) ? (
        children.map((child, index) => {
          return <SwiperSlide key={index}>{child}</SwiperSlide>;
        })
      ) : (
        <SwiperSlide>{children}</SwiperSlide>
      )}
    </Swiper>
  );
};

export default Slide;
