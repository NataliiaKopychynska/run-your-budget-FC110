import clsx from "clsx";
import s from "../Transactions.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  selectFilterData,
  selectPaginationData,
} from "../../../redux/transactions/selectors";
import { RxThickArrowRight, RxThickArrowLeft } from "react-icons/rx";
import { useEffect } from "react";
import { setFilterData } from "../../../redux/transactions/slice";

const TransactionPaginationSection = () => {
  const paginationData = useSelector(selectPaginationData);
  const filterData = useSelector(selectFilterData);
  const dispatch = useDispatch();

  useEffect(() => {
    if (
      paginationData.page > paginationData.totalPages &&
      paginationData.totalPages > 0
    ) {
      dispatch(
        setFilterData({
          page: paginationData.totalPages,
        })
      );
    }
  }, [
    dispatch,
    paginationData.page,
    paginationData.totalPages,
    paginationData.totalItems,
    filterData,
  ]);

  return (
    <div className={s.pagination}>
      {paginationData.totalPages > 1 && (
        <div className={s.paginationButtons}>
          {paginationData.hasPreviousPage && (
            <button
              type="button"
              className={s.prevBtn}
              onClick={() => {
                if (filterData.page > 1) {
                  dispatch(
                    setFilterData({
                      page: filterData.page - 1,
                    })
                  );
                }
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
                if (paginationData.page < paginationData.totalPages) {
                  dispatch(
                    setFilterData({
                      page: filterData.page + 1,
                    })
                  );
                }
              }}
            >
              <RxThickArrowRight />
            </button>
          )}
        </div>
      )}
      {paginationData.totalItems > 0 && (
        <select
          name="perPage"
          className={clsx(s.select, s.selectPerPage)}
          onChange={(e) => {
            const selectedValue = e.target.value;
            if (selectedValue !== "") {
              dispatch(setFilterData({ perPage: Number(selectedValue) }));
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
      )}
    </div>
  );
};

export default TransactionPaginationSection;
