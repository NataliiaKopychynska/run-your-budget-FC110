import clsx from "clsx";
import s from "../Transactions.module.css";
import { useSelector } from "react-redux";
import { selectPaginationData } from "../../../redux/transactions/selectors";
import { RxThickArrowRight, RxThickArrowLeft } from "react-icons/rx";
import { useEffect } from "react";

const TransactionPaginationSection = ({ setPage, setPerPage }) => {
  const paginationData = useSelector(selectPaginationData);

  useEffect(() => {
    if (
      paginationData.page > paginationData.totalPages &&
      paginationData.totalPages > 0
    ) {
      setPage(paginationData.totalPages);
    }
  }, [paginationData.page, paginationData.totalPages, setPage]);

  return (
    <div className={s.pagination}>
      {paginationData.totalPages > 1 && (
        <div className={s.paginationButtons}>
          {paginationData.hasPreviousPage && (
            <button
              type="button"
              className={s.prevBtn}
              onClick={() => {
                setPage((prevPage) => {
                  if (prevPage > 1) {
                    return prevPage - 1;
                  }
                  return prevPage;
                });
              }}
            >
              <RxThickArrowLeft />
            </button>
          )}

          <div>
            Page {paginationData.page} / {paginationData.totalPages}
          </div>

          {paginationData.hasNextPage && (
            <button
              type="button"
              className={s.nextBtn}
              onClick={() => {
                setPage((prevPage) => {
                  if (prevPage < paginationData.totalPages) {
                    return prevPage + 1;
                  }
                  return prevPage;
                });
              }}
            >
              <RxThickArrowRight />
            </button>
          )}
        </div>
      )}

      <select
        name="perPage"
        className={clsx(s.select, s.selectPerPage)}
        onChange={(e) => {
          const selectedValue = e.target.value;
          if (selectedValue !== "") {
            setPerPage(Number(selectedValue));
          }
        }}
      >
        <option value="">Items per page</option>
        <option value="10">10</option>
        <option value="20">20</option>
        <option value="30">30</option>
        <option value="40">40</option>
        <option value="50">50</option>
      </select>
    </div>
  );
};

export default TransactionPaginationSection;
