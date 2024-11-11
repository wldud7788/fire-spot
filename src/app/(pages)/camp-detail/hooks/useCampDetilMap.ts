import { useCallback, useEffect } from "react";
import { MapOptions } from "../../../../type/map";
import { Camp } from "../../camps/types/Camp";
import { useBaseMap } from "../../../../_hooks/useBaseMap";
import { MAP_CONFIG } from "../../search/constants/map";

export const useCampDetailMap = (camp: Camp) => {
  const { initializeMapBase, cleanup } = useBaseMap(); // mapInstanceRef 제거

  const initializeMap = useCallback(() => {
    const options: MapOptions = {
      center: new window.naver.maps.LatLng(
        Number(camp.mapY),
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

    const instance = initializeMapBase("detail-map", options);

    if (instance) {
      // 중심 위치를 LatLng 객체로 생성
      const position = new window.naver.maps.LatLng(
        Number(camp.mapY),
        Number(camp.mapX)
      );

      // 마커 생성 및 정보창 설정
      const marker = new window.naver.maps.Marker({
        position, // 직접 LatLng 객체 사용
        map: instance.map
      });

      instance.markers = [marker];
      instance.infoWindow.setContent(`
          <div style="width:${MAP_CONFIG.INFO_WINDOW_WIDTH}px;text-align:center;padding:10px;">
            <h4 style="margin-bottom:5px;font-weight:bold;">${camp.facltNm}</h4>
            <p style="margin:5px 0;">${camp.addr1}</p>
            <p style="margin:5px 0;">${camp.sbrsEtc || ""}</p>
          </div>
        `);
      instance.infoWindow.open(instance.map, position);
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
