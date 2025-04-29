import clsx from "clsx";
import s from "../Transactions.module.css";
import { useSelector } from "react-redux";
import { selectPaginationData } from "../../../redux/transactions/selectors";
import { RxThickArrowRight, RxThickArrowLeft } from "react-icons/rx";

const TransactionPaginationSection = ({ setPage, setPerPage }) => {
  const paginationData = useSelector(selectPaginationData);

  console.log(paginationData);
  return (
    <div>
      {paginationData.totalPages > 1 && (
        <div className={s.pagination}>
          <div className={s.paginationButtons}>
            {paginationData.hasPreviousPage && (
              <button
                type="button"
                className={s.prevBtn}
                onClick={setPage((actPage) => actPage - 1)}
              >
                <RxThickArrowLeft />
              </button>
            )}

            {paginationData.totalPages > 1 && (
              <div>
                Page {paginationData.page} / {paginationData.totalPages}
              </div>
            )}

            {paginationData.hasNextPage && (
              <button
                type="button"
                className={s.nextBtn}
                onClick={setPage((actPage) => actPage + 1)}
              >
                <RxThickArrowRight />
              </button>
            )}
          </div>

          <select
            name="perPage"
            className={clsx(s.select, s.selectPerPage)}
            onChange={(e) => {
              setPerPage(e.target.value);
            }}
          >
            <option>Items per page</option>
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="30">30</option>
            <option value="40">40</option>
            <option value="50">50</option>
          </select>
        </div>
      )}
    </div>
  );
};
export default TransactionPaginationSection;
