import Link from "next/link";
import React from "react";

const MainIcons = () => {
  const icons = [
    { id: 1, text: "오토캠핑", href: "#" },
    { id: 2, text: "카라반", href: "#" },
    { id: 3, text: "숲속캠핑", href: "#" },
    { id: 4, text: "백패킹", href: "#" },
    { id: 5, text: "글램핑", href: "#" },
    { id: 6, text: "펜션", href: "#" },
    { id: 7, text: "반려견동반", href: "#" },
    { id: 8, text: "캠핑꿀팁", href: "#" }
  ];
  return (
    <div className="icon_box">
      <ul className="flex items-center justify-center gap-[20px]">
        {icons.map((icon) => {
          return (
            <li key={icon.id}>
              <Link
                href={icon.href}
                className="flex flex-col items-center justify-center gap-[10px] text-[24px] text-[#404040]"
              >
                <img
                  className="h-[119px]"
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
