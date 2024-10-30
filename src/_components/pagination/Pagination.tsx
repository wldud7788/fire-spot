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
      <Link href={`/camps/${page - 1}`} passHref>
        <button disabled={page === 1}>이전</button>
      </Link>
      {page} / {totalPages}
      <Link href={`/camps/${page + 1}`} passHref>
        <button disabled={page === totalPages}>다음</button>
      </Link>
    </div>
  );
};

export default Pagination;
