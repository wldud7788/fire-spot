"use client";

import React, { useEffect, useState } from "react";
import Slide from "../slide/Slide";
import Link from "next/link";

const MainSlide: React.FC = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 450);
    };
    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  });

  const getImagePath = (src: string): string =>
    isMobile
      ? `/assets/images/main/img-banner-${src}-mo.jpg`
      : `/assets/images/main/img-banner-${src}-pc.jpg`;

  return (
    <Slide useAutoplay={true} usePagination={true}>
      <div className="h-full">
        <Link href="/beginner">
          <img
            className="h-full w-full object-cover"
            src={`${getImagePath("rudiments")}`}
            alt="초보 캠퍼 가이드로 이동"
          />
        </Link>
      </div>
      <div className="h-full">
        <Link href="/etiquette">
          <img
            className="h-full w-full object-cover"
            src={`${getImagePath("etiquette")}`}
            alt="에티켓 가이드로 이동"
          />
        </Link>
      </div>
      <div className="h-full">
        <Link href="/tip">
          <img
            className="h-full w-full object-cover"
            src={`${getImagePath("tips")}`}
            alt="초보 캠핑 꿀팁으로 이동"
          />
        </Link>
      </div>
      <div className="h-full">
        <Link href="/pet">
          <img
            className="h-full w-full object-cover"
            src={`${getImagePath("dog")}`}
            alt="반려동물 가이드로 이동"
          />
        </Link>
      </div>
      <div className="h-full">
        <Link href="/campfire">
          <img
            className="h-full w-full object-cover"
            src={`${getImagePath("bulmuong")}`}
            alt="불멍 가이드로 이동"
          />
        </Link>
      </div>
    </Slide>
  );
};

export default MainSlide;
