import React from "react";

type EtiquetteCardProps = {
  title: string;
  desc: string;
};

const EtiquetteCard = ({ title, desc }: EtiquetteCardProps) => {
  return (
    <div className="flex flex-col gap-[50px]">
      <strong className="color-gray01 flex h-[28px] items-center bg-guideBulb bg-left-center-0 bg-no-repeat pl-[28px] text-[24px] font-bold">
        {title}
      </strong>
      <p className="text-[18px]">{desc}</p>
    </div>
  );
};

export default EtiquetteCard;
