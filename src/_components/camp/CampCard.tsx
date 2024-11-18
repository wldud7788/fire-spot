import { Camp } from "@/app/(pages)/camps/types/Camp";
import { CampSelect } from "@/app/(pages)/meets/types/camp.types";
import Link from "next/link";
import LikeButton from "../like/LikeButton";
import ReviewBookMarkCount from "./ReviewBookMarkCount";

type CampingDataProps = {
  camp: CampSelect | Camp;
  type?: string;
  listParamsId?: string;
  onlikeClick?: (contentId: number, campName: string) => void;
};

const CampCard = ({ camp, type }: CampingDataProps) => {
  return (
    <div className="camping_card group">
      <Link href={`/camp-detail/${camp.contentId}`}>
        <div className="inner">
          <div className="img_box relative h-[300px] overflow-hidden rounded-[12px] max-1280:h-[250px] max-989:h-[200px] max-450:shadow-custom">
            <img
              src={
                camp.firstImageUrl
                  ? camp.firstImageUrl
                  : `/assets/images/common/img-camp-card.jpg`
              }
              className="relative h-full min-h-[300px] w-full transform object-cover transition-all duration-500 ease-in-out group-hover:scale-110"
              alt={camp.facltNm}
            />
            {!type ? (
              <LikeButton campId={camp.contentId.toString()} camp={camp} />
            ) : null}
          </div>

          {!type ? (
            <div className="camp_info pb-[60px] pt-[20px] max-450:pb-[0]">
              <h2 className="line-clamp-1 text-[20px] font-bold max-1280:text-[18px] max-989:text-[16px]">
                {camp.facltNm}
              </h2>
              <div className="mb-[8px] mt-[5px] bg-location bg-left-center-0 bg-no-repeat pl-[20px]">
                <p className="line-clamp-1 w-[calc(100%-20px)] text-[12px]">
                  {camp.addr1}
                </p>
              </div>
              <p className="color-gray02 line-clamp-3 min-h-[51px] text-[12px]">
                {camp.featureNm ? camp.featureNm : camp.intro}
              </p>
              <div className="info mt-[10px]">
                <span className="color-gray01 bg-sub rounded-[8px] px-[10px] py-[5px] text-[12px]">
                  {camp.induty}
                </span>
              </div>
            </div>
          ) : (
            <div className="camp_info relative mt-[20px] rounded-[12px] border border-[#d9d9d9] px-[15px] py-[25px] max-1280:mt-[10px]">
              <LikeButton campId={camp.contentId.toString()} camp={camp} />
              <span className="text-[13px] font-bold text-[#997457] max-1280:text-[12px]">
                {camp.induty}
              </span>
              <h2 className="mb-[15px] mt-[10px] text-[16px] font-bold max-1280:mb-[10px] max-1280:text-[14px] max-989:line-clamp-1">
                {camp.facltNm}
              </h2>
              <p className="color-gray02 line-clamp-3 text-[12px]">
                {camp.featureNm ? camp.featureNm : camp.intro}
              </p>
              <div className="mt-[18px] flex items-center gap-[8px]">
                {/* 리뷰와 북마크 수 카운트 */}
                <ReviewBookMarkCount campId={camp.contentId} camp={camp} />
              </div>
            </div>
          )}
        </div>
      </Link>
    </div>
  );
};

export default CampCard;
