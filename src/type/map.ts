import type { RefObject } from "react";

declare global {
  interface Window {
    naver: {
      maps: {
        Map: new (mapElement: HTMLElement, mapOptions: MapOptions) => NaverMap;
        LatLng: new (lat: number, lng: number) => NaverLatLng;
        Marker: new (options: MarkerOptions) => NaverMarker;
        InfoWindow: new (options: InfoWindowOptions) => NaverInfoWindow;
        Position: NaverPosition;
      };
    };
  }
}

interface NaverLatLng {
  lat(): number;
  lng(): number;
}

interface NaverMap {
  setCenter(location: NaverLatLng): void;
  setZoom(level: number): void;
  destroy(): void;
}

interface NaverMarker {
  setMap(map: NaverMap | null): void;
  getPosition(): NaverLatLng;
}

interface NaverInfoWindow {
  setContent(content: string): void;
  open(map: NaverMap, position: NaverLatLng): void;
  close(): void;
}

interface MapOptions {
  center: NaverLatLng;
  zoom: number;
  scaleControl?: boolean;
  mapDataControl?: boolean;
  zoomControl?: boolean;
  zoomControlOptions?: {
    position: number;
  };
}

interface MarkerOptions {
  position: NaverLatLng;
  map: NaverMap;
  icon?: string;
  title?: string;
}

interface InfoWindowOptions {
  content?: string;
  borderWidth?: number;
  borderColor?: string;
  backgroundColor?: string;
  anchorSize?: {
    width: number;
    height: number;
  };
  anchorSkew?: boolean;
  pixelOffset?: {
    x: number;
    y: number;
  };
}

interface NaverPosition {
  TOP: number;
  BOTTOM: number;
  LEFT: number;
  RIGHT: number;
  TOP_LEFT: number;
  TOP_RIGHT: number;
  BOTTOM_LEFT: number;
  BOTTOM_RIGHT: number;
}

interface MapRefs {
  infoWindow: RefObject<NaverInfoWindow | null>;
  map: RefObject<NaverMap | null>;
}

interface MapInstance {
  map: NaverMap;
  markers: NaverMarker[];
  infoWindow: NaverInfoWindow;
}

interface SearchParams {
  keyword?: string;
  region?: string;
}

export type {
  NaverMap,
  NaverMarker,
  NaverInfoWindow,
  NaverLatLng,
  NaverPosition,
  MapOptions,
  MarkerOptions,
  InfoWindowOptions,
  MapRefs,
  MapInstance,
  SearchParams
};
