type GuideCardProps = {
  title: string;
  desc: string;
};

const GuideCard = ({ title, desc }: GuideCardProps) => {
  return (
    <div className="mb-[15px]">
      <strong className="inline-block flex-none rounded-[3px] border border-[#FF924C] bg-[#FFEFE5] p-0 px-[10px] py-[5px] text-[16px] text-[#b24600] max-1280:text-[14px] max-767:text-[13px]">
        {title}
      </strong>
      <p className="color-gray01 mt-[15px] text-[16px] max-1280:text-[14px] max-767:text-[13px]">
        {desc}
      </p>
    </div>
  );
};

export default GuideCard;
