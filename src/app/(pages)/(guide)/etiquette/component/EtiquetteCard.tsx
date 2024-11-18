import React from "react";

type EtiquetteCardProps = {
  title: string;
  desc: string;
};

const EtiquetteCard = ({ title, desc }: EtiquetteCardProps) => {
  return (
    <div className="flex flex-col gap-[50px] max-1280:gap-[40px]">
      <strong className="color-gray01 flex min-h-[28px] items-center bg-guideBulb bg-left-center-0 bg-no-repeat pl-[28px] text-[24px] font-bold max-1280:text-[22px] max-767:text-[20px]">
        {title}
      </strong>
      <p className="text-[18px] max-1280:text-[16px] max-767:text-[14px]">
        {desc}
      </p>
    </div>
  );
};

export default EtiquetteCard;
