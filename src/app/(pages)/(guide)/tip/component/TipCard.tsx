import React from "react";

type TipCardProps = {
  id: number;
  img: string;
  title: string;
  desc: string;
};

const TipCard = ({ id, img, title, desc }: TipCardProps) => {
  return (
    <div className="relative flex flex-col items-center justify-center text-center">
      <span className="tip-abs color-gray01 flex h-[56px] w-[155px] items-center justify-center bg-guideTip bg-cover bg-center text-[18px] font-bold">{`Tip. ${id}`}</span>
      <img src={img} alt={`${title} 이미지`} />
      <strong className="color-gray01 mb-[20px] mt-[15px] text-[20px] font-bold">
        {title}
      </strong>
      <p className="color-gray01 text-[16px]">{desc}</p>
    </div>
  );
};

export default TipCard;
