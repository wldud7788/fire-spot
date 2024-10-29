"use client";
import React, { useEffect } from "react";

export default function Map() {
  useEffect(() => {
    const initMap = () => {
      const mapOptions = {
        center: new naver.maps.LatLng(37.3595704, 127.105399),
        zoom: 10
      };

      new naver.maps.Map("map", mapOptions);
    };

    if (window.naver && window.naver.maps) {
      initMap();
    } else {
      const mapScript = document.createElement("script");
      mapScript.onload = () => initMap();
      mapScript.src = `https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${process.env.NEXT_PUBLIC_NAVER_MAP_CLIENT_ID}&clientSecret=${process.env.NAVER_MAP_CLIENT_SECRET}`;
      document.head.appendChild(mapScript);
    }
  }, []);

  return (
    <div
      id="map"
      style={{ width: "calc(100% - 400px)", height: "100vh" }}
    ></div>
  );
}
