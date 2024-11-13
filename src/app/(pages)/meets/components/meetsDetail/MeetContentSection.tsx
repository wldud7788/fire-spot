import React from "react";
import { MeetWithCamp } from "../../types/meet.types";
type Props = {
  meetWithCamp: MeetWithCamp;
};
const MeetContentSection = ({ meetWithCamp }: Props) => {
  const { meet } = meetWithCamp;
  return (
    <div className="mt-[80px]">
      <h2 className="color-gray01 text-[24px] font-bold">
        모임소개 및 모임장 한마디
      </h2>
      <div className="mt-[37px] flex flex-wrap content-stretch gap-[50px]">
        <div className="flex w-[285px] flex-none flex-col items-center justify-center rounded-[12px] border border-[#A6A6A6] bg-[#f6f6f6] p-[30px]">
          <div className="h-[100px] w-[100px] rounded-full bg-[#d9d9d9]">
            {/* 유저 이미지 */}
            <img
              className="h-full w-full object-cover"
              src=""
              alt={"유저 이름 이미지"}
            />
          </div>
          <strong className="color-gray01 my-[12px] block text-[18px] font-bold">
            유저이름
          </strong>
          <ul className="flex items-center justify-center gap-[12px]">
            <li className="color-gray02 text-[18px]">
              팔로워 {/* 팔로워 카운트 */}0
            </li>
            <li className="color-gray02 text-[18px]">
              정복 {/* 정복 카운트 */}0
            </li>
          </ul>
        </div>
        <div className="w-full max-w-[calc(100%-335px)] rounded-[12px] border border-[#A6A6A6] px-[60px] py-[20px]">
          <div className="text-[16px] text-[#757575]">{meet.content}</div>
        </div>
      </div>
    </div>
  );
};

export default MeetContentSection;
