import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { MeetForm, MeetWithCamp } from "../types/meet.types";

import { GOAMPING_KEY, GOAMPING_SEARCH_LIST_URL } from "@/_utils/api/apiKey";
import { processSubmitData } from "../utils/processSubmitData";
import { upsertCamp } from "../actions/meetWriteAction";
import { CampToDB } from "../types/camp.types";
import { defaultValues } from "../utils/writeFormDefaultValues";
import useDate from "./useDate";
const SEARCH_URL = `${GOAMPING_SEARCH_LIST_URL}?serviceKey=${GOAMPING_KEY}&MobileOS=ETC&MobileApp=AppTest&pageNo=1&numOfRows=5&_type=json&keyword=`;

const useMeetCreatorForm = (meetWithCamp: MeetWithCamp = defaultValues) => {
  const { meet, camp, attendee_count } = meetWithCamp;

  const {
    contentId,
    title,
    content,
    is_newbie,
    supplies,
    deadline_headcount,
    start_date,
    end_date
  } = meet;

  const { facltNm } = camp;

  const [startDate, setStartDate] = useDate(start_date);
  const [endDate, setEndDate] = useDate(end_date);
  const [searchKeyword, setSearchKeyword] = useState(facltNm);
  const [isOpen, setIsOpen] = useState(false);
  const [searchList, setSearchList] = useState<CampToDB[]>([]);
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    clearErrors,
    formState: { errors }
  } = useForm<MeetForm>({
    defaultValues: {
      contentId,
      title,
      content,
      is_newbie: is_newbie + "",
      supplies,
      deadline_headcount,
      start_date: startDate,
      end_date: endDate
    }
  });
  const onSubmit: SubmitHandler<MeetForm> = (data) => {
    processSubmitData(data);
  };

  /** 검색 후 드롭다운 클릭 이벤트 */
  const handleSelectCamp = (camp: CampToDB) => {
    setValue("contentId", camp.contentId);

    setIsOpen(false);
    setSearchKeyword(camp.facltNm);
    upsertCamp(camp);
    clearErrors("contentId");
  };

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

export default useMeetCreatorForm;
