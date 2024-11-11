import { useRef, useCallback } from "react";
import type { MapInstance, MapOptions } from "../type/map";

export const useBaseMap = () => {
  const mapInstanceRef = useRef<MapInstance | null>(null);

  const initializeMapBase = useCallback(
    (elementId: string, options: MapOptions) => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.map.destroy();
        mapInstanceRef.current = null;
      }

      const mapElement = document.getElementById(elementId);
      if (!mapElement || typeof window === "undefined" || !window.naver?.maps)
        return null;

      try {
        const map = new window.naver.maps.Map(mapElement, options);
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
    },
    []
  );

  const cleanup = useCallback(() => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.map.destroy();
      mapInstanceRef.current = null;
    }
  }, []);

  return {
    mapInstanceRef,
    initializeMapBase,
    cleanup
  };
};
