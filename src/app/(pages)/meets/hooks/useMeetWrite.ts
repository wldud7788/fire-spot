import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { MeetForm } from "../types/meet.types";
import { Camp } from "../../camps/types/Camp";
import useDate from "./useDate";
type Input = MeetForm;
import {
  GOAMPING_IMAGE_LIST_URL,
  GOAMPING_KEY,
  GOAMPING_SEARCH_LIST_URL
} from "@/_utils/api/apiKey";
import { processSubmitData } from "../utils/processSubmitData";
import { upsertCamp } from "../actions/meetWriteAction";
import { CampToDB } from "../types/camp.types";
const SEARCH_URL = `${GOAMPING_SEARCH_LIST_URL}?serviceKey=${GOAMPING_KEY}&MobileOS=ETC&MobileApp=AppTest&pageNo=1&numOfRows=5&_type=json&keyword=`;

const useMeetWrite = () => {
  const [startDate, setStartDate] = useDate();
  const [endDate, setEndDate] = useDate();
  const [searchKeyword, setSearchKeyword] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [searchList, setSearchList] = useState<CampToDB[]>([]);
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    clearErrors,
    formState: { errors }
  } = useForm<Input>({
    defaultValues: {
      start_date: startDate,
      end_date: endDate,
      deadline_headcount: 3
    }
  });
  const onSubmit: SubmitHandler<Input> = (data) => processSubmitData(data);

  /** 검색 후 드롭다운 클릭 이벤트 */
  const handleSelectCamp = (camp: CampToDB) => {
    setValue("contentId", camp.contentId);

    setIsOpen(false);
    setSearchKeyword(camp.facltNm);
    upsertCamp(camp);
    clearErrors("contentId"); // 훅폼 contentId 에러 초기화
  };

  /**
   * input 입력 이벤트
   *
   * isOpen 핸들링
   *  - e.target.value 가 "" 이면 true
   */
  const handleChangeSearchKeyword = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setIsOpen(!!e.target.value);
    setSearchKeyword(e.target.value);

    const getCampSearchList = async () => {
      try {
        if (e.target.value && isOpen) {
          const res = await fetch(SEARCH_URL + encodeURI(e.target.value));
          const data = await res.json();

          setSearchList(data.response.body.items.item);
        } else {
          setSearchList([]);
        }
      } catch (e) {
        console.error(e);
      } finally {
      }
    };

    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    // 200ms 후에 API 요청
    const id = setTimeout(() => {
      getCampSearchList();
    }, 100);
    setTimeoutId(id);

    return () => {
      clearTimeout(id);
    };
  };
  return {
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    register,
    handleSubmit,
    setValue,
    handleSelectCamp,
    errors,
    onSubmit,
    searchKeyword,
    searchList,
    handleChangeSearchKeyword,
    isOpen,
    setIsOpen
  };
};

export default useMeetWrite;
