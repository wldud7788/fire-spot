import Script from "next/script";
import React from "react";
import Map from "./components/map";

const SearchPage = () => {
  return (
    <>
      <Script
        type="text/javascript"
        src={`https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${process.env.NEXT_PUBLIC_NAVER_MAP_CLIENT_ID}&clientSecret=${process.env.NAVER_MAP_CLIENT_SECRET}`}
      ></Script>
      <div className="flex">
        <div className="h-screen w-[400px]">
          <h2>검색결과</h2>
          <div className="flex">
            <img
              src="/assets/images/default_profile.jpeg"
              alt=""
              className="w-[100px]"
            />
            <div>
              <p>캠핑장 이름</p>
              <p>캠핑장 설명</p>
            </div>
          </div>
        </div>
        <Map />
      </div>
    </>
  );
};

export default SearchPage;
