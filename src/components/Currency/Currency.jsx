import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCurrencyRates } from "../../redux/currency/operations";
import { selectCurrencyRates } from "../../redux/currency/selectors";
import styles from "./Currency.module.css";

const Currency = () => {
  const dispatch = useDispatch();
  const rates = useSelector(selectCurrencyRates);

  useEffect(() => {
    dispatch(fetchCurrencyRates());
  }, [dispatch]);

  const filteredRates = rates.filter(
    (rate) =>
      (rate.currencyCodeA === 840 && rate.currencyCodeB === 980) ||
      (rate.currencyCodeA === 978 && rate.currencyCodeB === 980)
  );

  const formatCurrency = (code) => {
    switch (code) {
      case 840:
        return "USD";
      case 978:
        return "EUR";
      default:
        return code;
    }
  };

  return (
    <div className={styles.currencySection}>
      <div className={styles.tableHeader}>
        <span>Currency</span>
        <span>Purchase</span>
        <span>Sale</span>
      </div>
      <div className={styles.tableBody}>
        {filteredRates.map((rate) => (
          <div key={rate.currencyCodeA} className={styles.tableRow}>
            <span>{formatCurrency(rate.currencyCodeA)}</span>
            <span>{rate.rateBuy?.toFixed(2)}</span>
            <span>{rate.rateSell?.toFixed(2)}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Currency;
