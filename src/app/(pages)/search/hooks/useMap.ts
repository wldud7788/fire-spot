// hooks/useMap.ts
import { useEffect, useRef, useCallback } from "react";
import { Camp } from "../../camps/types/Camp";
import { MapInstance } from "../types/map";
import { MAP_CONFIG } from "../constants/map";

export const useMap = (camps: Camp[]) => {
  const mapInstanceRef = useRef<MapInstance | null>(null);

  const initializeMap = useCallback(() => {
    // 이미 초기화된 맵이 있다면 제거
    if (mapInstanceRef.current) {
      mapInstanceRef.current.map.destroy();
      mapInstanceRef.current = null;
    }

    // DOM이 완전히 준비되었는지 확인
    const mapElement = document.getElementById("map");
    if (!mapElement || !window.naver || !window.naver.maps) return;

    try {
      const mapOptions = {
        center: new naver.maps.LatLng(
          MAP_CONFIG.INITIAL_CENTER.lat,
          MAP_CONFIG.INITIAL_CENTER.lng
        ),
        zoom: MAP_CONFIG.INITIAL_ZOOM,
        scaleControl: false,
        mapDataControl: false,
        zoomControl: true,
        zoomControlOptions: {
          position: naver.maps.Position.TOP_RIGHT
        }
      };

      const map = new naver.maps.Map(mapElement, mapOptions);
      const infoWindow = new naver.maps.InfoWindow({ content: "" });

      mapInstanceRef.current = {
        map,
        markers: [],
        infoWindow
      };

      return mapInstanceRef.current;
    } catch (error) {
      console.error("Map initialization error:", error);
      return null;
    }
  }, []);

  const moveToMarker = useCallback((selectedCamp: Camp) => {
    if (!mapInstanceRef.current) return;

    const { map, infoWindow } = mapInstanceRef.current;
    const position = new naver.maps.LatLng(
      Number(selectedCamp.mapY),
      Number(selectedCamp.mapX)
    );

    map.setCenter(position);
    map.setZoom(MAP_CONFIG.ZOOM_LEVEL);

    infoWindow.setContent(`
      <div style="width:${MAP_CONFIG.INFO_WINDOW_WIDTH}px;text-align:center;padding:10px;">
        <h4 style="margin-bottom:5px;font-weight:bold;">${selectedCamp.facltNm}</h4>
        <p style="margin:5px 0;">${selectedCamp.addr1}</p>
        <p style="margin:5px 0;">${selectedCamp.sbrsEtc}</p>
        <a href="/camps/${selectedCamp.contentId}" 
           style="display:inline-block;margin-top:5px;text-decoration:none;color:black;">
          자세히보기
        </a>
      </div>
    `);

    infoWindow.open(map, position);
  }, []);

  const createMarkers = useCallback(() => {
    if (!mapInstanceRef.current || !camps.length) return;

    const { map } = mapInstanceRef.current;

    // 기존 마커 제거
    if (mapInstanceRef.current.markers.length) {
      mapInstanceRef.current.markers.forEach((marker) => marker.setMap(null));
      mapInstanceRef.current.markers = [];
    }

    // 새로운 마커 생성
    const newMarkers = camps.map((camp) => {
      return new naver.maps.Marker({
        position: new naver.maps.LatLng(Number(camp.mapY), Number(camp.mapX)),
        map
      });
    });

    mapInstanceRef.current.markers = newMarkers;
  }, [camps]);

  // 지도 초기화
  useEffect(() => {
    // 약간의 지연을 주어 DOM이 완전히 준비되도록 함
    const timer = setTimeout(() => {
      const mapInstance = initializeMap();
      if (mapInstance && camps.length > 0) {
        createMarkers();
      }
    }, 100);

    return () => {
      clearTimeout(timer);
      if (mapInstanceRef.current) {
        mapInstanceRef.current.map.destroy();
        mapInstanceRef.current = null;
      }
    };
  }, [camps, initializeMap, createMarkers]);

  return { moveToMarker };
};
