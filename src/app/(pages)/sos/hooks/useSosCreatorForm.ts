import { useRouter } from "next/navigation";
import { SosInsert, SosSelect, SosWithCamp } from "../types/sos.types";
import { SubmitHandler, useForm } from "react-hook-form";
import processSosSubmitData from "../utils/processSosSubmitData";
import { CampInsert } from "../../meets/types/camp.types";
import { useState } from "react";
import {
  GOCAMPING_HOST,
  GOCAMPING_KEY,
  GOCAMPING_SEARCH
} from "@/_utils/api/apiKey";
import { upsertCamp } from "../../meets/actions/meetWriteAction";
const SEARCH_URL = `${GOCAMPING_HOST}${GOCAMPING_SEARCH}?serviceKey=${GOCAMPING_KEY}&MobileOS=ETC&MobileApp=AppTest&pageNo=1&numOfRows=5&_type=json&keyword=`;
type Props = {
  sosId?: number;
  sosWithCamp: SosWithCamp;
};
const useSosCreatorForm = ({ sosId, sosWithCamp }: Props) => {
  const router = useRouter();
  const { sos, camp } = sosWithCamp;
  const { contentId, title, content, tag, type } = sos;
  const { facltNm, addr1 } = camp;

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
  } = useForm<SosInsert>({
    defaultValues: {
      title,
      content,
      tag,
      type,
      contentId
      // id
      // created_at
    }
  });

  const handleKeyDown = (event: React.KeyboardEvent<HTMLFormElement>) => {
    if (event.key === "Enter") {
      event.preventDefault(); // Enter 키로 인한 form 제출 방지
    }
  };

  const onSubmit: SubmitHandler<SosInsert> = async (data) => {
    // TODO 사카모토
    await processSosSubmitData(data, sosId);
    router.replace("/sos");
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
    register,
    handleSubmit,
    setValue,
    clearErrors,
    errors,
    watch,
    handleKeyDown,
    onSubmit,
    searchKeyword,
    location,
    searchList,
    handleSelectCamp,
    handleChangeSearchKeyword,
    isOpen,
    setIsOpen
  };
};

export default useSosCreatorForm;
