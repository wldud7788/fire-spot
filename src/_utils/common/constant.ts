export const DEADLINE_APPROACHING = 3;

export const MIN_HEADCOUNT = 3;
export const MAX_HEADCOUNT = 20;

export const MIN_SEARCH_LENGTH = 2; // 최소 검색어 길이
//허용되지 않는 특수문자 정규식
export const SPECIAL_CHARS = /[!@#$%^&*()_+\=\[\]{};':"\\|,.<>\/?]+/;

export const TAGS = [
  { name: "#캠핑", href: "/search?campingTypes=일반야영장" },
  { name: "#차박", href: "/search?campingTypes=자동차야영장" },
  { name: "#글램핑", href: "/search?campingTypes=글램핑" },
  { name: "#내부화장실", href: "/search?amenities=내부화장실" },
  { name: "#애견동반 가능", href: "/search?petOption=가능" }
];
