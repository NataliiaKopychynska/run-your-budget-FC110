import Currency from "../../components/Currency/Currency";
import styles from "./CurrencyPage.module.css";

const CurrencyPage = () => {
  return (
    <div className={styles.pageWrapper}>
      <Currency />
    </div>
  );
};

export default CurrencyPage;
