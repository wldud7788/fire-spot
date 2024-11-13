type CardProps = {
  title: string;
  desc: string;
};

const Card = ({ title, desc }: CardProps) => {
  return (
    <div className="mb-[15px]">
      <strong className="inline-block flex-none rounded-[3px] border border-[#FF924C] bg-[#FFEFE5] p-0 px-[10px] py-[5px] text-[16px] text-[#b24600]">
        {title}
      </strong>
      <p className="color-gray01 mt-[15px] text-[16px]">{desc}</p>
    </div>
  );
};

export default Card;
