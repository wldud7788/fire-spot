import React from "react";
import PageTitle from "./PageTitle";
import Link from "next/link";

type CommunityTopProps = {
  text: string;
};

const GuideTop = ({ text }: CommunityTopProps) => {
  return (
    <div className="community_top my-[60px]">
      <PageTitle text={text} />
      <ul className="mt-[60px] flex items-center gap-[24px] border-b border-b-[#BFBFBF]">
        <li>
          <Link
            href={"/befinner"}
            className={`${text === "초보 캠퍼 가이드" && "active font-bold text-[##B24600]"} relative block pb-[8px] text-[20px] text-[#42526E]`}
          >
            초보 캠퍼 가이드
          </Link>
        </li>
        <li>
          <Link
            href="/etiqutte"
            className={`${text === "에티켓 가이드" && "active font-bold text-[##B24600]"} relative block pb-[8px] text-[20px] text-[#42526E]`}
          >
            에티켓 가이드
          </Link>
        </li>
        <li>
          <Link
            href="/tip"
            className={`${text === "초보 캠핑 꿀팁" && "active font-bold text-[##B24600]"} relative block pb-[8px] text-[20px] text-[#42526E]`}
          >
            초보 캠핑 꿀팁
          </Link>
        </li>
        <li>
          <Link
            href="/pet"
            className={`${text === "반려동물 가이드" && "active font-bold text-[##B24600]"} relative block pb-[8px] text-[20px] text-[#42526E]`}
          >
            반려동물 가이드
          </Link>
        </li>
        <li>
          <Link
            href="/campfire"
            className={`${text === "불멍 가이드" && "active font-bold text-[##B24600]"} relative block pb-[8px] text-[20px] text-[#42526E]`}
          >
            불멍 가이드
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default GuideTop;
