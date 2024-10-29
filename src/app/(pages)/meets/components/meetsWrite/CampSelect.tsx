"use client";

import { GOAMPING_KEY, GOAMPING_SEARCH_LIST_URL } from "@/_utils/api/apiKey";
import { Camp } from "@/app/(pages)/camps/types/Camp";
import React, { useEffect, useState } from "react";

const SEARCH_URL = `${GOAMPING_SEARCH_LIST_URL}?serviceKey=${GOAMPING_KEY}&MobileOS=ETC&MobileApp=AppTest&pageNo=1&numOfRows=5&_type=json&keyword=`;

const CampSelect = () => {
  const [keyword, setKeyword] = useState("");
  const [searchList, setSearchList] = useState<Camp[]>([]);
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const getCampSearchList = async () => {
      if (keyword) {
        console.log("keyword", keyword);
        const res = await fetch(SEARCH_URL + encodeURI(keyword));
        const data = await res.json();

        setSearchList(data);
      } else {
        setSearchList([]);
      }
    };

    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    // 200ms 후에 API 요청
    const id = setTimeout(() => {
      getCampSearchList();
    }, 200);
    setTimeoutId(id);

    return () => {
      clearTimeout(id);
    };
  }, [keyword]);

  console.log("searchList", searchList);
  const handleSearchKeyword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
  };

  return (
    // <div className="h-40 bg-slate-400">
    <input
      type="text"
      className="mb-10 h-20 border-4"
      onChange={handleSearchKeyword}
    />
    // </div>
  );
};

export default CampSelect;
