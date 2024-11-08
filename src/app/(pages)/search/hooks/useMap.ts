import { useEffect, useRef, useCallback } from "react";
import type {
  MapInstance,
  MapOptions,
  NaverLatLng,
  NaverMarker
} from "../types/map";
import { MAP_CONFIG } from "../constants/map";
import { Camp } from "../../camps/types/Camp";

export const useMap = (camps: Camp[]) => {
  const mapInstanceRef = useRef<MapInstance | null>(null);

  const initializeMap = useCallback(() => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.map.destroy();
      mapInstanceRef.current = null;
    }

    const mapElement = document.getElementById("map");
    if (!mapElement || typeof window === "undefined" || !window.naver?.maps)
      return;

    try {
      const mapOptions: MapOptions = {
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

      const map = new window.naver.maps.Map(mapElement, mapOptions);
      const infoWindow = new window.naver.maps.InfoWindow({ content: "" });

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
        <a href="/camps/${selectedCamp.contentId}" 
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
      if (mapInstanceRef.current) {
        mapInstanceRef.current.map.destroy();
        mapInstanceRef.current = null;
      }
    };
  }, [camps, initializeMap, createMarkers]);

  return { moveToMarker };
};
