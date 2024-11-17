type BeginnerCardProps = {
  img: string;
  title: string;
  desc: string;
};

const BeginnerCard = ({ img, title, desc }: BeginnerCardProps) => {
  return (
    <div className="guide_card01 flex flex-col items-center justify-center px-[40px] py-[60px] text-center max-1280:px-[30px] max-1280:py-[40px]">
      <div className="h-[120px] w-[120px] overflow-hidden rounded-full">
        <img
          src={img}
          alt={`${title} 이미지`}
          className="h-full w-full object-cover"
        />
      </div>

      <strong className="mb-[20px] mt-[40px] block text-[20px] font-bold text-[#404040] max-1280:text-[18px]">
        {title}
      </strong>
      <p className="color-[#404040] text-[16px] max-1280:text-[14px]">{desc}</p>
    </div>
  );
};

export default BeginnerCard;
