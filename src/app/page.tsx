import MainCamps from "@/_components/main/MainCamps";
import MainIcons from "@/_components/main/MainIcons";
import MainReviews from "@/_components/main/MainReviews";
import MainSection from "@/_components/main/MainSection";
import MainSlide from "@/_components/main/MainSlide";
import MainTop from "@/_components/main/MainTop";
import MainUserCard from "@/_components/main/MainUserCard";
import MainSearch from "@/_components/main/MainSearch";

import {
  dehydrate,
  HydrationBoundary,
  QueryClient
} from "@tanstack/react-query";

export default function Home() {
  const queryClient = new QueryClient();

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="main_area">
        <div className="inner">
          {/* main_top */}
          <MainSection>
            <MainTop />
            <MainSearch />
          </MainSection>
          {/*// main_top */}

          {/* main_sec01 */}
          <MainSection background="#fff">
            <div className="flex flex-wrap content-stretch gap-[20px]">
              <div className="main-slide-wrap w-[calc(100%-515px)] overflow-hidden rounded-[12px]">
                <MainSlide />
              </div>
              <div className="flex-1 rounded-[12px] border border-[#d9d9d9] bg-[#fff] p-[30px]">
                <MainUserCard />
              </div>
            </div>
          </MainSection>
          {/*// main_sec01 */}

          {/* main_sec02 */}
          <MainSection>
            <MainIcons />
          </MainSection>
          {/*// main_sec02 */}

          {/* main_sec02 */}
          <MainSection background="#fff">
            <h2 className="flex items-center justify-center text-center text-[32px] font-bold">
              캠핑장
            </h2>
            <MainCamps />
          </MainSection>
          {/*// main_sec02 */}

          {/* main_sec03 */}
          <MainSection background="#F2F2F2">
            <h2 className="flex items-center justify-center text-center text-[32px] font-bold">
              후기
            </h2>
            <MainReviews />
          </MainSection>
          {/*// main_sec03 */}
        </div>
      </div>
    </HydrationBoundary>
  );
}
