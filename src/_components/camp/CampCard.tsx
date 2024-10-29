import { Camp } from "@/app/(pages)/camps/types/Camp";
import Link from "next/link";

type CampingDataProps = {
  camp: Camp;
  type?: string;
};

/**
 * [메인]
 * 이미지,카테고리,타이틀,북마크,짧은글(태그인데, 태그 처리가 안될경우?),후기갯수,북마크갯수
 * [일반 카드]
 * 이미지,카테고리,위치,북마크,위치 삭제
 */

const CampCard = ({ camp, type }: CampingDataProps) => {
  return (
    <div className="camping_card group">
      <Link href={`/camps/${camp.contentId}`}>
        <div className="inner">
          <div className="img_box relative overflow-hidden py-[23%]">
            <img
              src={camp.firstImageUrl}
              className="relative transform transition-all duration-500 ease-in-out group-hover:scale-110"
              alt={camp.facltNm}
            />
            {!type ? (
              <div className="absolute right-[15px] top-[15px]">북마크</div>
            ) : null}
          </div>

          {!type ? (
            <div className="camp_info">
              <h2 className="text-[20px]">{camp.facltNm}</h2>
              <p>{camp.featureNm ? camp.featureNm : camp.intro}</p>
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
          ) : (
            <div className="camp_info relative">
              <div className="absolute right-[15px] top-[15px]">북마크</div>
              <span>{camp.induty}</span>
              <h2>{camp.facltNm}</h2>
              <p>{camp.featureNm ? camp.featureNm : camp.intro}</p>
              <div className="flex gap-[10px]">
                <p>후기 갯수</p>
                <p>북마크 갯수</p>
              </div>
            </div>
          )}
        </div>
      </Link>
    </div>
  );
};

export default CampCard;
