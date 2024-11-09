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
  const bookmarkActive = false;

  return (
    <div className="camping_card group">
      <Link href={`/camp-detail/${camp.contentId}`}>
        <div className="inner">
          <div className="img_box relative h-[300px] overflow-hidden rounded-[12px]">
            <img
              src={
                camp.firstImageUrl
                  ? camp.firstImageUrl
                  : `/assets/image/common/img-camp-card.jpg`
              }
              className="relative h-full w-full transform object-cover transition-all duration-500 ease-in-out group-hover:scale-110"
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
            <div className="camp_info relative mt-[20px] rounded-[12px] border border-[#d9d9d9] px-[15px] py-[25px]">
              <div className="absolute right-[15px] top-[15px]">
                {/* 윤지님 북마크 컴포넌트 아래의 버튼 클래스, 이미지 사용하시면 됩니다.*/}
                <button
                  type="button"
                  className={`${bookmarkActive ? "bg-gray03" : "bg-white"} flex h-[30px] w-[30px] items-center justify-center rounded-[100%] border border-[#d9d9d9]`}
                >
                  <img
                    src={"/assets/images/common/ico-heart.svg"}
                    alt={"찜하기"}
                  />
                </button>
              </div>
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
                    alt={`${camp.facltDivNm} 후기 갯수 이미지`}
                  />
                  {/* [이윤지 작업] - 후기 카운트 노출시켜야합니다. 아래의 100*/}
                  <span>100</span>
                </p>
                <p className="color-gray04 flex items-center gap-[2px] text-[12px]">
                  <img
                    src="/assets/images/main/ico-main-bookmark-count.svg"
                    alt={`${camp.facltDivNm} 북마크 갯수 이미지`}
                  />
                  {/* [이윤지 작업] - 북마크 카운트 노출시켜야합니다. 아래의 100*/}
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
