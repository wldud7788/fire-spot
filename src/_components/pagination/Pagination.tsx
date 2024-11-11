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
    <div className="pagination flex items-center justify-center gap-[5px]">
      <button
        onClick={onMovePagePrev}
        disabled={page === 1}
        className="btn-pagination btn-pagination-prev"
      >
        이전
      </button>
      <div className="pagination-count relative flex h-[40px] items-center justify-center gap-[5px]">
        <p className="bg-sub color-main bd-color-main border font-bold">
          {page}
        </p>
        /<span className="border border-[#bfbfbf]">{totalPages}</span>
      </div>
      <button
        onClick={onMovePageNext}
        disabled={page === totalPages}
        className="btn-pagination btn-pagination-next"
      >
        다음
      </button>
    </div>
  );
};

export default Pagination;
