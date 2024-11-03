export interface MapRefs {
  infoWindow: React.RefObject<naver.maps.InfoWindow | null>;
  map: React.RefObject<naver.maps.Map | null>;
}
export interface MapInstance {
  map: naver.maps.Map;
  markers: naver.maps.Marker[];
  infoWindow: naver.maps.InfoWindow;
}

export interface SearchParams {
  keyword?: string;
  region?: string;
}
