import { campCard } from "@/app/(pages)/camps/types/Champ";
import Image from "next/image";

type CampingDataProps = {
  campingData: campCard;
};

const CampCard = ({ campingData }: CampingDataProps) => {
  return (
    <div className="camping_card group w-[calc(25%-30px)]">
      <div className="inner">
        <div>
          <div className="img_box relative overflow-hidden py-[23%]">
            <Image
              src={campingData.img}
              className="full h-full transform transition-all duration-500 ease-in-out group-hover:scale-110"
              layout="fill"
              alt={campingData.img}
            />
          </div>
          <span>{campingData.state}</span>
          <button>북마크</button>
        </div>
        <h2 className="text-[20px]">{campingData.title}</h2>
        <div className="info">
          <p className="text-[15px]">{campingData.location}</p>
          <p>{campingData.date}</p>
          <p>
            {campingData.personnel}명모집({campingData.personnelCount01}/
            {campingData.personnelCount02})
          </p>
        </div>
      </div>
    </div>
  );
};

export default CampCard;
