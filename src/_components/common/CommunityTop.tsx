import React from "react";
import PageTitle from "./PageTitle";
import Link from "next/link";

type CommunityTopProps = {
  text: string;
};

const CommunityTop = ({ text }: CommunityTopProps) => {
  return (
    <div className="community_top my-[60px] max-1280:mb-[20px] max-1280:mt-[40px]">
      <PageTitle text={"커뮤니티"} />
      <ul className="mt-[60px] flex items-center gap-[24px] border-b border-b-[#BFBFBF] max-767:mt-[40px] max-767:gap-[15px]">
        <li>
          <Link
            href={"/meets"}
            className={`${text === "캠핑모임" && "active font-bold text-[##B24600]"} relative block pb-[8px] text-[20px] text-[#42526E] max-1280:text-[18px] max-767:text-[13px]`}
          >
            캠핑모임
          </Link>
        </li>
        <li>
          <Link
            href="/sos"
            className={`${text === "SOS 도움요청" && "active font-bold text-[##B24600]"} relative block pb-[8px] text-[20px] text-[#42526E] max-1280:text-[18px] max-767:text-[13px]`}
          >
            SOS 도움요청
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default CommunityTop;
