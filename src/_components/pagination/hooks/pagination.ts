import { useRouter } from "next/navigation";
import { useState } from "react";

// 제네릭 타입 사용해서 다양한 타입의 아이템 배열을 받을 수 있도록해줌
type UsePaginationProps<T> = {
  items: T[]; // 페이지네이션할 아이템 배열
  itemsPerPage: number; // 한 페이지에 보여줄 수 있는 아이템 수
  paramsId: string; // 리스트 페이지 params 값
};

const usePagination = <T>({
  items,
  itemsPerPage,
  paramsId
}: UsePaginationProps<T>) => {
  const router = useRouter();
  // 현재 페이지 상태를 관리하는 state
  const [page, setPage] = useState<number>(Number(paramsId));
  // 총 페이지 수를 계산 (데이터 총 갯수 / 설정한 페이지 갯수)
  const totalPages = Math.ceil(items.length / itemsPerPage);

  // 현재 페이지에 해당하는 데이터를 계산해줌
  const currentItems = items.slice(
    (page - 1) * itemsPerPage, // 시작 인덱스 => (page - 1)은 배열이 0부터 시작해서 빼줘야함
    page * itemsPerPage // 종료 인덱스 => 페이지가 2면 인덱스 번호 끝은 16임 (itemsPerPage = 8)
  );

  const movePagePrev = () => {
    if (page > 1) {
      setPage((prev) => prev - 1);
      router.push(`${paramsId}?page=${page - 1}`);
    } else {
      // 사카모토 써야함
      alert("첫번째 페이집니다.");
    }
  };

  const movePageNext = () => {
    if (page < totalPages) {
      setPage((prev) => prev + 1);
      router.push(`${paramsId}?page=${page + 1}`);
    } else {
      // 사카모토 써야함
      alert("마지막 페이집니다.");
    }
  };

  return {
    page, // 현재 페이지
    totalPages, // 총 페이지 갯수
    currentItems, // 현재 페이지에 해당하는 아이템
    movePagePrev, // 이전 페이지로 이동하는 함수
    movePageNext // 다음 페이지로 이동하는 함수
  };
};

export default usePagination;
