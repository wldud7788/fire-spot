import Link from "next/link";

type PaginationProps = {
  page: number;
  totalPages: number;
  onMovePagePrev: () => void;
  onMovePageNext: () => void;
};

const Pagination = ({
  page,
  totalPages,
  onMovePagePrev,
  onMovePageNext
}: PaginationProps) => {
  return (
    <div className="pagination">
      <button onClick={onMovePagePrev} disabled={page === 1}>
        이전
      </button>
      {page} / {totalPages}
      <button onClick={onMovePageNext} disabled={page === totalPages}>
        다음
      </button>
    </div>
  );
};

export default Pagination;
