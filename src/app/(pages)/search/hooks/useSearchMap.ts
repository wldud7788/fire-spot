import { useEffect, useRef, useCallback } from "react";
import type { MapOptions, NaverMarker } from "../../../../type/map";
import { MAP_CONFIG } from "../constants/map";
import { Camp } from "../../camps/types/Camp";
import { useBaseMap } from "../../../../_hooks/useBaseMap";

export const useMap = (camps: Camp[]) => {
  const { mapInstanceRef, initializeMapBase, cleanup } = useBaseMap();

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
    return initializeMapBase("map", options);
  }, [initializeMapBase]);

  const moveToMarker = useCallback((selectedCamp: Camp) => {
    if (!mapInstanceRef.current || !window.naver?.maps) return;

    const { map, infoWindow } = mapInstanceRef.current;
    const position = new window.naver.maps.LatLng(
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
        <a href="/camp-detail/${selectedCamp.contentId}" 
           style="display:inline-block;margin-top:5px;text-decoration:none;color:black;">
          자세히보기
        </a>
      </div>
    `);

    infoWindow.open(map, position);
  }, []);

  const createMarkers = useCallback(() => {
    if (!mapInstanceRef.current || !camps.length || !window.naver?.maps) return;

    const { map } = mapInstanceRef.current;

    if (mapInstanceRef.current.markers.length) {
      mapInstanceRef.current.markers.forEach((marker) => marker.setMap(null));
      mapInstanceRef.current.markers = [];
    }

    const newMarkers: NaverMarker[] = camps.map((camp) => {
      return new window.naver.maps.Marker({
        position: new window.naver.maps.LatLng(
          Number(camp.mapY),
          Number(camp.mapX)
        ),
        map
      });
    });

    mapInstanceRef.current.markers = newMarkers;
  }, [camps]);

  useEffect(() => {
    const timer = setTimeout(() => {
      const mapInstance = initializeMap();
      if (mapInstance && camps.length > 0) {
        createMarkers();
      }
    }, 100);

    return () => {
      clearTimeout(timer);
      cleanup();
    };
  }, [camps, initializeMap, createMarkers, cleanup]);

  return { moveToMarker };
};
