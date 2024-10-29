import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { MeetForm } from "../types/meet.types";
import { Camp } from "../../camps/types/Camp";
import useDate from "../hooks/useDate";
type Input = MeetForm;
import { GOAMPING_KEY, GOAMPING_SEARCH_LIST_URL } from "@/_utils/api/apiKey";
const SEARCH_URL = `${GOAMPING_SEARCH_LIST_URL}?serviceKey=${GOAMPING_KEY}&MobileOS=ETC&MobileApp=AppTest&pageNo=1&numOfRows=5&_type=json&keyword=`;

const useMeetWriteForm = () => {
  const [startDate, setStartDate] = useDate();
  const [endDate, setEndDate] = useDate();
  const [searchKeyword, setSearchKeyword] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [searchList, setSearchList] = useState<Camp[]>([]);
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm<Input>({
    defaultValues: {
      start_date: startDate,
      end_date: endDate
    }
  });
  const onSubmit: SubmitHandler<Input> = (data) => console.log(data);

  const handleSelectCamp = (camp: Camp) => {
    setValue("camp_id", camp.contentId);

    setIsOpen(false);
    setSearchKeyword(camp.facltNm);
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

export default useMeetWriteForm;
