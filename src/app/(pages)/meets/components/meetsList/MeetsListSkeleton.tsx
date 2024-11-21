import React from "react";

const MeetsListSkeleton = () => {
  return (
    <ul className="mt-[40px] flex flex-wrap gap-[20px] max-1280:gap-[20px] max-767:mt-[20px] max-767:flex-col">
      {Array(6)
        .fill(null)
        .map((_, index) => (
          <li className="w-[calc(50%-10px)] max-767:w-full" key={index}>
            <div className="meet_card rounded-[20px] bg-[#ffefe5] px-[30px] py-[25px] max-767:px-[20px] max-767:py-[15px]">
              <div className="inner">
                <div className="utils m flex items-center justify-between">
                  <ul className="flex w-full max-w-[calc(100%-40px)] flex-wrap gap-[10px] max-767:gap-[5px]">
                    <li className="bg-sk02 color-hide rounded-[20px] px-[12px] py-[5px] text-[12px] max-767:py-[3px] max-767:text-[11px]">
                      마감
                    </li>
                    <li className="bg-sk02 color-hide rounded-[20px] px-[12px] py-[5px] text-[12px] max-767:py-[3px] max-767:text-[11px]">
                      마감
                    </li>
                    <li className="bg-sk02 color-hide rounded-[20px] px-[12px] py-[5px] text-[12px] max-767:py-[3px] max-767:text-[11px]">
                      마감
                    </li>
                  </ul>
                </div>
                <div className="color-hide bg-sk02 mb-[15px] mt-[15px] block text-[18px] font-bold max-1280:text-[16px]">
                  text
                </div>
                <div className="info flex gap-[20px] max-1280:gap-[10px]">
                  <p className="bg-sk02 color-hide bg-left-center-0 bg-no-repeat pl-[20px] text-[14px] max-1280:text-[12px]">
                    text
                  </p>
                  <p className="bg-sk02 color-hide bg-left-center-0 bg-no-repeat pl-[18px] text-[14px] max-1280:text-[12px]">
                    text
                  </p>
                  <p className="bg-sk02 color-hide bg-left-center-0 bg-no-repeat pl-[18px] text-[14px] max-1280:text-[12px]">
                    text
                  </p>
                </div>
              </div>
            </div>
          </li>
        ))}
    </ul>
  );
};

export default MeetsListSkeleton;
