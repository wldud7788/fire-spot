import Link from "next/link";
import React from "react";

const MainIcons = () => {
  const icons = [
    { id: 1, text: "오토캠핑", href: "/search?campingTypes=일반야영장" },
    { id: 2, text: "카라반", href: "/search?campingTypes=카라반" },
    { id: 3, text: "숲속캠핑", href: "/search?keyword=숲속" },
    { id: 4, text: "백패킹", href: "/search?groundTypes=맨흙" },
    { id: 5, text: "글램핑", href: "/search?campingTypes=글램핑" },
    { id: 6, text: "펜션", href: "/search?keyword=펜션" },
    { id: 7, text: "반려견동반", href: "/search?petOption=가능" },
    { id: 8, text: "캠핑꿀팁", href: "/tip" }
  ];
  return (
    <div className="icon_box">
      <ul className="flex items-center justify-center gap-[40px] max-767:flex-wrap max-767:gap-[20px]">
        {icons.map((icon) => {
          return (
            <li key={icon.id} className="max-767:w-[calc(25%-15px)]">
              <Link
                href={icon.href}
                className="flex flex-col items-center justify-center gap-[10px] text-[24px] text-[#404040] max-1280:text-[18px] max-989:text-[16px] max-767:text-[14px]"
              >
                <img
                  className="h-[128px] w-[128px] max-1280:h-[100px] max-1280:w-[100px] max-989:h-[80px] max-989:w-[80px] max-767:h-[65px] max-767:w-[65px]"
                  src={`/assets/images/main/ico-main-${icon.id}.svg`}
                  alt={`${icon.text} 이미지`}
                />
                {icon.text}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default MainIcons;
