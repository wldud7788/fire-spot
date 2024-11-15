import { Camp } from "@/app/(pages)/camps/types/Camp";
import { CampSelect } from "@/app/(pages)/meets/types/camp.types";
import Link from "next/link";
import LikeButton from "../like/LikeButton";

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
          <div className="img_box relative h-[300px] overflow-hidden rounded-[12px]">
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
            <div className="camp_info pb-[60px] pt-[20px]">
              <h2 className="line-clamp-1 text-[20px] font-bold">
                {camp.facltNm}
              </h2>
              <p className="mb-[8px] mt-[5px] line-clamp-1 block bg-location bg-left-center-0 bg-no-repeat pl-[20px] text-[12px]">
                {camp.addr1}
              </p>
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
            <div className="camp_info relative mt-[20px] rounded-[12px] border border-[#d9d9d9] px-[15px] py-[25px]">
              <LikeButton campId={camp.contentId.toString()} camp={camp} />
              <span className="text-[13px] font-bold text-[#997457]">
                {camp.induty}
              </span>
              <h2 className="mb-[15px] mt-[10px] text-[16px] font-bold">
                {camp.facltNm}
              </h2>
              <p className="color-gray02 line-clamp-3 text-[12px]">
                {camp.featureNm ? camp.featureNm : camp.intro}
              </p>
              <div className="mt-[18px] flex items-center gap-[8px]">
                <p className="color-gray04 flex items-center gap-[2px] text-[12px]">
                  <img
                    className="relative top-[-1px]"
                    src="/assets/images/main/ico-main-review-count.svg"
                    alt={`${camp.facltNm} 후기 갯수 이미지`}
                  />
                  {/* [이윤지 작업] - 후기 카운트 노출시켜야합니다. 아래의 100*/}
                  <span>100</span>
                </p>
                <p className="color-gray04 flex items-center gap-[2px] text-[12px]">
                  <img
                    src="/assets/images/main/ico-main-bookmark-count.svg"
                    alt={`${camp.facltNm} 좋아요 갯수 이미지`}
                  />
                  {/* [이윤지 작업] - 좋아요 카운트 노출시켜야합니다. 아래의 100*/}
                  <span>100</span>
                </p>
              </div>
            </div>
          )}
        </div>
      </Link>
    </div>
  );
};

export default CampCard;
