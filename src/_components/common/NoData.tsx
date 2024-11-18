import React from "react";

type NoDataProps = {
  text: string | undefined;
};

const NoData = ({ text }: NoDataProps) => {
  return (
    <div className="w-full rounded-[12px] border-2 border-dashed border-[#bfbfbf] px-[30px] py-[100px] text-center max-767:py-[60px]">
      <p className="color-main inline-block bg-plusColor bg-left-center-0 bg-no-repeat pl-[24px] text-[14px]">
        {text}
      </p>
    </div>
  );
};

export default NoData;
