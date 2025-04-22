import Currency from "../../components/Currency/Currency";
// import styles from "./CurrencyPage.module.css";
import { useMediaQuery } from "react-responsive";

const CurrencyPage = () => {
  const isDesktop = useMediaQuery({
    query: "(min-width: 768px)",
  });
  return <>{!isDesktop && <Currency />}</>;
};

export default CurrencyPage;
