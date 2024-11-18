import { useEffect, useCallback } from "react";
import type { MapOptions, NaverMarker } from "../../../../type/map";
import { MAP_CONFIG } from "../constants/map";
import { Camp } from "../../camps/types/Camp";
import { useBaseMap } from "../../../../_hooks/useBaseMap";

export const useMap = (camps: Camp[]) => {
  const { mapInstanceRef, initializeMapBase, cleanup } = useBaseMap();

  // 지도 초기화 함수
  const initializeMap = useCallback(() => {
    const options: MapOptions = {
      center: new window.naver.maps.LatLng(
        MAP_CONFIG.INITIAL_CENTER.lat,
        MAP_CONFIG.INITIAL_CENTER.lng
      ),
      zoom: MAP_CONFIG.INITIAL_ZOOM,
      scaleControl: false,
      mapDataControl: false,
      zoomControl: true,
      zoomControlOptions: {
        position: window.naver.maps.Position.TOP_RIGHT
      }
    };

    const instance = initializeMapBase("map", options);

    // 인포윈도우 옵션 설정
    if (mapInstanceRef.current) {
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
      mapInstanceRef.current.infoWindow = new window.naver.maps.InfoWindow(
        infoWindowOptions
      );
    }

    return instance;
  }, [initializeMapBase]);

  // 인포윈도우 콘텐츠 생성 함수

  const createInfoWindowContent = useCallback((camp: Camp) => {
    return `
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
    `;
  }, []);

  // 특정 캠프의 위치로 이동하고 정보 창을 표시하는 함수
  const moveToMarker = useCallback(
    (selectedCamp: Camp) => {
      if (!mapInstanceRef.current || !window.naver?.maps) return;

      const { map, infoWindow } = mapInstanceRef.current;
      const position = new window.naver.maps.LatLng(
        Number(selectedCamp.mapY),
        Number(selectedCamp.mapX)
      );

      map.setCenter(position);
      map.setZoom(MAP_CONFIG.ZOOM_LEVEL);

      infoWindow.setContent(createInfoWindowContent(selectedCamp));
      infoWindow.open(map, position);
    },
    [createInfoWindowContent]
  );

  // 캠프 데이터를 기반으로 지도에 마커를 생성하는 함수
  const createMarkers = useCallback(() => {
    if (!mapInstanceRef.current || !camps.length || !window.naver?.maps) return;

    const { map, infoWindow } = mapInstanceRef.current;

    // 기존 마커 제거
    if (mapInstanceRef.current.markers.length) {
      mapInstanceRef.current.markers.forEach((marker) => marker.setMap(null));
      mapInstanceRef.current.markers = [];
    }

    // 현재 열려있는 마커의 인덱스를 추적
    let openedMarkerIndex: number | null = null;

    const newMarkers: NaverMarker[] = camps.map((camp, index) => {
      const marker = new window.naver.maps.Marker({
        position: new window.naver.maps.LatLng(
          Number(camp.mapY),
          Number(camp.mapX)
        ),
        map
      });

      // 마커 클릭 이벤트 핸들러
      window.naver.maps.Event.addListener(marker, "click", () => {
        const position = marker.getPosition();

        // 현재 클릭한 마커의 인포윈도우가 열려있는 경우
        if (openedMarkerIndex === index) {
          infoWindow.close();
          openedMarkerIndex = null;
        }
        // 다른 마커의 인포윈도우가 열려있거나 아무것도 열려있지 않은 경우
        else {
          infoWindow.setContent(createInfoWindowContent(camp));
          infoWindow.open(map, position);
          openedMarkerIndex = index;
        }
      });

      return marker;
    });

    // 지도 클릭 시 인포윈도우 닫기
    window.naver.maps.Event.addListener(map, "click", () => {
      infoWindow.close();
      openedMarkerIndex = null;
    });

    mapInstanceRef.current.markers = newMarkers;
  }, [camps, createInfoWindowContent]);

  // 첫 번째 캠프로 이동하는 함수
  const moveToFirstCamp = useCallback(() => {
    if (!camps.length || !mapInstanceRef.current || !window.naver?.maps) return;

    const firstCamp = camps[0];
    const { map } = mapInstanceRef.current;
    const position = new window.naver.maps.LatLng(
      Number(firstCamp.mapY),
      Number(firstCamp.mapX)
    );

    map.setCenter(position);
    map.setZoom(MAP_CONFIG.ZOOM_LEVEL);
  }, [camps]);

  useEffect(() => {
    const timer = setTimeout(() => {
      const mapInstance = initializeMap();
      if (mapInstance && camps.length > 0) {
        createMarkers();
        moveToFirstCamp();
      }
    }, 100);

    return () => {
      clearTimeout(timer);
      cleanup();
    };
  }, [camps, initializeMap, createMarkers, cleanup, moveToFirstCamp]);

  return { moveToMarker, mapInstanceRef };
};
