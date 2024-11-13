type CardProps = {
  img: string;
  title: string;
  desc: string;
};

const Card = ({ img, title, desc }: CardProps) => {
  return (
    <div className="guide_card01 flex flex-col items-center justify-center px-[40px] py-[60px] text-center">
      <div className="h-[120px] w-[120px] overflow-hidden rounded-full">
        <img
          src={img}
          alt={`${title} 이미지`}
          className="h-full w-full object-cover"
        />
      </div>

      <strong className="mb-[20px] mt-[40px] block text-[20px] font-bold text-[#404040]">
        {title}
      </strong>
      <p className="color-[#404040] text-[16px]">{desc}</p>
    </div>
  );
};

export default Card;
