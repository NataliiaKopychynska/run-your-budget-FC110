import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCurrencyRates } from "../../redux/currency/operations";
import { selectCurrencyRates } from "../../redux/currency/selectors";
import { useMediaQuery } from "react-responsive";

import styles from "./Currency.module.css";

const Currency = () => {
  const dispatch = useDispatch();
  const rates = useSelector(selectCurrencyRates);

  useEffect(() => {
    dispatch(fetchCurrencyRates());
  }, [dispatch]);

  const usdRate = rates.find(
    (rate) => rate.currencyCodeA === 840 && rate.currencyCodeB === 980
  );
  const eurRate = rates.find(
    (rate) => rate.currencyCodeA === 978 && rate.currencyCodeB === 980
  );

  const rateBuyUSD = usdRate?.rateBuy?.toFixed(2) || "-";
  const rateSellUSD = usdRate?.rateSell?.toFixed(2) || "-";
  const rateBuyEUR = eurRate?.rateBuy?.toFixed(2) || "-";
  const rateSellEUR = eurRate?.rateSell?.toFixed(2) || "-";

  const isDesktop = useMediaQuery({ minWidth: 1280 });

  return (
    <div className={styles.currencyWrapper}>
      <table className={styles.currencyTable}>
        <thead className={styles.tableHeader}>
          <tr>
            <th className={styles.tableName}>Currency</th>
            <th className={styles.tableName}>Purchase</th>
            <th className={styles.tableName}>Sale</th>
          </tr>
        </thead>
        <tbody className={styles.tableBody}>
          <tr className={styles.tableRow}>
            <td className={styles.tableData}>USD</td>
            <td className={styles.tableData}>{rateBuyUSD}</td>
            <td className={styles.tableData}>{rateSellUSD}</td>
          </tr>
          <tr className={styles.tableRow}>
            <td className={styles.tableData}>EUR</td>
            <td className={styles.tableData}>{rateBuyEUR}</td>
            <td className={styles.tableData}>{rateSellEUR}</td>
          </tr>
        </tbody>
      </table>
      {isDesktop && <div className={styles.usdChart}>{rateBuyUSD}</div>}
      {isDesktop && <div className={styles.eurChart}>{rateBuyEUR}</div>}
    </div>
  );
};

export default Currency;
