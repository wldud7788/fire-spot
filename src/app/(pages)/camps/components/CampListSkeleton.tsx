import React from "react";

const CampCardSkeleton = () => {
  return (
    <li className="w-[calc(25%-22.5px)] max-989:w-[calc(50%-8px)] max-450:w-full">
      <div className="inner">
        <div className="img_box relative h-[300px] overflow-hidden rounded-[12px] bg-[#d1d1d1] max-1280:h-[250px] max-989:h-[200px] max-450:shadow-custom">
          <div className="relative h-full min-h-[300px] w-full transform object-cover transition-all duration-500 ease-in-out group-hover:scale-110" />
        </div>

        <div className="camp_info pb-[60px] pt-[20px] max-450:pb-[0]">
          <h2 className="line-clamp-1 rounded-[8px] bg-[#e5e5e5] text-[20px] font-bold text-[rgba(0,0,0,0)] max-1280:text-[18px] max-989:text-[16px]">
            text
          </h2>
          <div className="mb-[8px] mt-[5px] rounded-[8px] bg-[#e5e5e5] pl-[20px]">
            <p className="line-clamp-1 w-[calc(100%-20px)] text-[12px] text-[rgba(0,0,0,0)]">
              text
            </p>
          </div>
          <p className="line-clamp-3 min-h-[51px] rounded-[8px] bg-[#e5e5e5] text-[12px] text-[rgba(0,0,0,0)]">
            text
          </p>
          <div className="info mt-[10px]">
            <span className="rounded-[8px] bg-[#e5e5e5] px-[10px] py-[5px] text-[12px] text-[rgba(0,0,0,0)]">
              text
            </span>
          </div>
        </div>
      </div>
    </li>
  );
};

export default CampCardSkeleton;
