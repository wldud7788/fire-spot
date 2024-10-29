import { Camp } from "@/app/(pages)/camps/types/Camp";
import Image from "next/image";
import Link from "next/link";

type CampingDataProps = {
  camp: Camp;
};

const CampCard = ({ camp }: CampingDataProps) => {
  return (
    <div className="camping_card group">
      <Link href={`/camps/${camp.contentId}`}>
        <div className="inner">
          <div className="img_box relative overflow-hidden py-[23%]">
            <Image
              src={camp.firstImageUrl}
              className="full h-full transform transition-all duration-500 ease-in-out group-hover:scale-110"
              layout="fill"
              alt={camp.facltNm}
            />
            <span>{camp.doNm}</span>
          </div>
          <h2 className="text-[20px]">{camp.facltNm}</h2>
          <div className="tag">{camp.sbrsEtc}</div>
          <div className="info">
            <p>{camp.addr1}</p>
            <p>249Km</p>
            <p>
              <span>{camp.induty}</span>
              <span>파쇄석</span>
              <span>20도 맑음</span>
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default CampCard;
