import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { MeetInsert, MeetWithCamp } from "../types/meet.types";

import { GOCAMPING_KEY, GOAMPING_SEARCH_LIST_URL } from "@/_utils/api/apiKey";
import { processSubmitData } from "../utils/processSubmitData";
import { upsertCamp } from "../actions/meetWriteAction";
import { CampInsert } from "../types/camp.types";
import useDate from "./useDate";
import { useRouter } from "next/navigation";
const SEARCH_URL = `${GOAMPING_SEARCH_LIST_URL}?serviceKey=${GOCAMPING_KEY}&MobileOS=ETC&MobileApp=AppTest&pageNo=1&numOfRows=5&_type=json&keyword=`;

interface Props {
  meetId?: string;
  meetWithCamp: MeetWithCamp;
}

const useMeetCreatorForm = ({ meetId, meetWithCamp }: Props) => {
  const { meet, camp, attendee_count } = meetWithCamp;
  const router = useRouter();

  const {
    contentId,
    title,
    content,
    is_newbie,
    supplies,
    deadline_headcount,
    ground_type,
    start_date,
    end_date
  } = meet;

  const { facltNm, addr1 } = camp;

  const [startDate, setStartDate] = useDate(start_date);
  const [endDate, setEndDate] = useDate(end_date);
  const [searchKeyword, setSearchKeyword] = useState(facltNm);
  const [location, setLocation] = useState(addr1);
  const [isOpen, setIsOpen] = useState(false);
  const [searchList, setSearchList] = useState<CampInsert[]>([]);
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    clearErrors,
    watch,
    formState: { errors }
  } = useForm<MeetInsert>({
    defaultValues: {
      contentId,
      title,
      content,
      ground_type,
      is_newbie: is_newbie,
      supplies,
      deadline_headcount,
      start_date: startDate,
      end_date: endDate
    }
  });
  const onSubmit: SubmitHandler<MeetInsert> = (data) => {
    processSubmitData(data, meetId);
    // TODO 사카모토
    router.replace("/meets");
  };

  /** 검색 후 드롭다운 클릭 이벤트 */
  const handleSelectCamp = (camp: CampInsert) => {
    setValue("contentId", camp.contentId);

    setIsOpen(false);
    setSearchKeyword(camp.facltNm);
    setLocation(camp.addr1);
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
    watch,
    onSubmit,
    searchKeyword,
    location,
    searchList,
    handleChangeSearchKeyword,
    isOpen,
    setIsOpen
  };
};

export default useMeetCreatorForm;
