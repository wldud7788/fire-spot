import { useCallback, useEffect } from "react";
import { MapOptions } from "../../../../type/map";
import { Camp } from "../../camps/types/Camp";
import { useBaseMap } from "../../../../_hooks/useBaseMap";
import { MAP_CONFIG } from "../../search/constants/map";

export const useCampDetailMap = (camp: Camp) => {
  const { initializeMapBase, cleanup } = useBaseMap();

  const initializeMap = useCallback(() => {
    // 마커의 실제 위치로 사용될 좌표
    const markerPosition = new window.naver.maps.LatLng(
      Number(camp.mapY),
      Number(camp.mapX)
    );

    const options: MapOptions = {
      // 지도의 중심점을 마커보다 약간 위로 조정
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

    // InfoWindow 옵션 설정
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

    // 맵 인스턴스 초기화 시 InfoWindow 옵션도 함께 전달
    const instance = initializeMapBase("detail-map", options);

    if (instance) {
      // 기존 infoWindow 제거 후 새로운 옵션으로 생성
      if (instance.infoWindow) {
        instance.infoWindow.close();
      }
      instance.infoWindow = new window.naver.maps.InfoWindow(infoWindowOptions);

      // 마커 생성 및 정보창 설정
      const marker = new window.naver.maps.Marker({
        position: markerPosition, // 마커는 원래 위치에 표시
        map: instance.map
      });

      instance.markers = [marker];
      instance.infoWindow.setContent(`
        <div style="width:300px; text-align:center; padding:30px; border-radius:10px; box-shadow:0 2px 4px rgba(0,0,0,0.1); position:relative; background:white; margin-top:-40px;">
          <h4 style="margin-bottom:5px;font-weight:bold;color:#FF924C;font-size:18px">${camp.facltNm}</h4>
          <p style="margin:5px 0;color:#A6A6A6">${camp.addr1}</p>
          <p style="margin:5px 0; font-size: 14px;">${camp.sbrsEtc}</p>
          <a href="/camp-detail/${camp.contentId}" 
             style="border-radius:10px; display:inline-block;margin-top:5px;text-decoration:none;color:white;background-color:#FFB180;padding:5px 10px;">
            자세히보기
          </a>
          <div style="position:absolute;bottom:-8px;left:50%;transform:translateX(-50%);width:0;height:0;border-left:8px solid transparent;border-right:8px solid transparent;border-top:8px solid white;"></div>
        </div>
      `);
      instance.infoWindow.open(instance.map, markerPosition);
    }

    return instance;
  }, [camp, initializeMapBase]);

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
