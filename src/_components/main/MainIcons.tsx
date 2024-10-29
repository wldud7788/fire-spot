import Link from "next/link";
import React from "react";

const MainIcons = () => {
  const dummyData = [
    { id: 1, text: "아이콘1", src: "#", href: "#" },
    { id: 2, text: "아이콘2", src: "#", href: "#" },
    { id: 3, text: "아이콘3", src: "#", href: "#" },
    { id: 4, text: "아이콘4", src: "#", href: "#" },
    { id: 5, text: "아이콘5", src: "#", href: "#" },
    { id: 6, text: "아이콘6", src: "#", href: "#" },
    { id: 7, text: "아이콘7", src: "#", href: "#" },
    { id: 8, text: "아이콘8", src: "#", href: "#" }
  ];
  return (
    <div className="icon_box">
      <ul className="flex items-center justify-center gap-[20px]">
        {dummyData.map((icon) => {
          return (
            <li key={icon.id}>
              <Link
                href={icon.href}
                className="color-[#404040] flex flex-col items-center justify-center gap-[10px] text-[24px]"
              >
                <img src={icon.src} />
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
