import { campCard } from "@/app/(pages)/camps/types/Champ";

type CampingDataProps = {
  campingData: campCard;
};

const CampCard = ({ campingData }: CampingDataProps) => {
  return (
    <div className="camping_card">
      <div className="inner">
        <div>
          <img src={campingData.img} />
          <span>{campingData.state}</span>
          <button>북마크</button>
        </div>
        <h2>{campingData.title}</h2>
        <div className="info">
          <p>{campingData.location}</p>
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
