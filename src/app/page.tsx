import MainButton from "@/_components/main/MainButton";
import MainIcons from "@/_components/main/MainIcons";
import MainSection from "@/_components/main/MainSection";
import MainTop from "@/_components/main/MainTop";
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
          </MainSection>
          {/*// main_top */}

          {/* main_sec01 */}
          <MainSection background="#F2F2F2">
            <div className="flex items-center gap-[20px]">
              <div className="w-[calc(100%-465px)] rounded-[20px]">
                슬라이더 위치
              </div>
              <div className="flex-1 rounded-[20px] bg-[#E0E0E0] p-[40px]">
                <div className="mb-[20px] flex items-center">
                  <img src="/assets/images/ico-fire-spot.svg" />
                  <p className="text-[24px] font-bold">이준열 님</p>
                </div>
                <div className="mb-[15px] flex gap-[15px]">
                  <MainButton text={"내 모임"} />
                  <MainButton text={"내 후기"} />
                </div>
                <MainButton text={"캠핑 꿀팁 바로가기"} />
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
          </MainSection>
          {/*// main_sec02 */}

          {/* main_sec03 */}
          <MainSection background="#F2F2F2">
            <h2 className="flex items-center justify-center text-center text-[32px] font-bold">
              후기
            </h2>
          </MainSection>
          {/*// main_sec03 */}
        </div>
      </div>
    </HydrationBoundary>
  );
}
