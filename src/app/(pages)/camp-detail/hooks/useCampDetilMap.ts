import { useCallback, useEffect } from "react";
import { MapOptions } from "../../../../type/map";
import { Camp } from "../../camps/types/Camp";
import { useBaseMap } from "../../../../_hooks/useBaseMap";

interface CampDetailMapOptions {
  showDetailButton?: boolean; // 자세히보기 버튼 표시 여부
}

export const useCampDetailMap = (
  camp: Camp,
  options: CampDetailMapOptions = {}
) => {
  const { initializeMapBase, cleanup } = useBaseMap();
  const { showDetailButton = true } = options; // 기본값은 true

  const initializeMap = useCallback(() => {
    const markerPosition = new window.naver.maps.LatLng(
      Number(camp.mapY),
      Number(camp.mapX)
    );

    const mapOptions: MapOptions = {
      center: new window.naver.maps.LatLng(
        Number(camp.mapY) + 0.005,
        Number(camp.mapX)
      ),
      zoom: 15,
      scaleControl: false,
      mapDataControl: false,
      zoomControl: true,
      zoomControlOptions: {
        position: window.naver.maps.Position.TOP_RIGHT
      }
    };

    const infoWindowOptions = {
      content: "",
      borderWidth: 0,
      backgroundColor: "white",
      anchorSize: {
        width: 0,
        height: 0
      },
      anchorSkew: false,
      anchorColor: "white",
      pixelOffset: new window.naver.maps.Point(0, -50)
    };

    const instance = initializeMapBase("detail-map", mapOptions);

    if (instance) {
      if (instance.infoWindow) {
        instance.infoWindow.close();
      }
      instance.infoWindow = new window.naver.maps.InfoWindow(infoWindowOptions);

      const marker = new window.naver.maps.Marker({
        position: markerPosition,
        map: instance.map
      });

      instance.markers = [marker];

      // 자세히보기 버튼을 조건부로 추가
      const detailButton = showDetailButton
        ? `<a href="/camp-detail/${camp.contentId}" 
             style="border-radius:10px; display:inline-block;margin-top:5px;text-decoration:none;color:white;background-color:#FFB180;padding:5px 10px;">
            자세히보기
           </a>`
        : "";

      // camp.sbrEtc가 없는 경우를 위한 조건부
      const sbrsEtcContent = camp.sbrsEtc
        ? `<p style="margin:5px 0; font-size: 14px;">${camp.sbrsEtc}</p>`
        : "";

      instance.infoWindow.setContent(`
        <div style="width:300px; text-align:center; padding:30px; border-radius:10px; box-shadow:0 2px 4px rgba(0,0,0,0.1); position:relative; background:white; margin-top:-40px;">
          <h4 style="margin-bottom:5px;font-weight:bold;color:#FF924C;font-size:18px">${camp.facltNm}</h4>
          <p style="margin:5px 0;color:#A6A6A6">${camp.addr1}</p>
          ${sbrsEtcContent} 
          ${detailButton}
          <div style="position:absolute;bottom:-8px;left:50%;transform:translateX(-50%);width:0;height:0;border-left:8px solid transparent;border-right:8px solid transparent;border-top:8px solid white;"></div>
        </div>
      `);
      instance.infoWindow.open(instance.map, markerPosition);
    }

    return instance;
  }, [camp, initializeMapBase, showDetailButton]);

  useEffect(() => {
    const timer = setTimeout(() => {
      initializeMap();
    }, 100);

    return () => {
      clearTimeout(timer);
      cleanup();
    };
  }, [initializeMap, cleanup]);
};
