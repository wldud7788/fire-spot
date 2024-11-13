import React from "react";
import PageTitle from "./PageTitle";
import Link from "next/link";

type CommunityTopProps = {
  text: string;
};

const CommunityTop = ({ text }: CommunityTopProps) => {
  return (
    <div className="community_top my-[60px]">
      <PageTitle text={"커뮤니티"} />
      <ul className="mt-[60px] flex items-center gap-[24px] border-b border-b-[#BFBFBF]">
        <li>
          <Link
            href={"/meets"}
            className={`${text === "캠핑모임" && "active font-bold text-[##B24600]"} relative block pb-[8px] text-[20px] text-[#42526E]`}
          >
            캠핑모임
          </Link>
        </li>
        <li>
          <Link
            href="/sos"
            className={`${text === "SOS 도움요청" && "active font-bold text-[##B24600]"} relative block pb-[8px] text-[20px] text-[#42526E]`}
          >
            SOS 도움요청
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default CommunityTop;
