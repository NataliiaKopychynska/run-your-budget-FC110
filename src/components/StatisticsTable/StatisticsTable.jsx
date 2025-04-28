import { useSelector } from 'react-redux';

import s from './StatisticsTable.module.css';

import { selectPeriodTransactions } from '../../redux/statistics/selectors';
import { backgroundColor } from '../../utils/statisticsColors';

const StatisticsTable = () => {
  const {
    categoriesSummary = [],
    expenseSummary = 0,
    incomeSummary = 0,
  } = useSelector(selectPeriodTransactions);

  const expCategoriesSummary = categoriesSummary.filter(
    category => category.type === 'EXPENSE'
  );

  const formatNumber = sum => {
    const [integerPart, decimalPart] = sum.toFixed(2).split('.');
    const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
    return `${formattedInteger}.${decimalPart}`;
  };

  return (
    <div className={s.tableWrapper}>
      <table className={s.table}>
        <thead className={s.tableHead}>
          <tr className={s.tableHeadRow}>
            <th className={s.tableColName}>Category</th>
            <th className={s.tableColName}>Sum</th>
          </tr>
        </thead>
      </table>
      <div className={s.tableBodyContainer}>
        <table className={s.table}>
          <tbody className={s.tableBody}>
            {expCategoriesSummary.map((category, index) => (
              <tr key={index} className={s.tableRow}>
                <td className={`${s.tableData} ${s.categoryCell}`}>
                  <span
                    className={s.legendColor}
                    style={{
                      backgroundColor:
                        backgroundColor[index % backgroundColor.length],
                    }}
                  ></span>
                  <span className={s.categoryName}>{category.name}</span>
                </td>
                <td className={`${s.tableData} ${s.amountCell}`}>{formatNumber(category.total)}</td>
              </tr>
            ))}
            <tr className={s.bottomTop}>
              <td className={s.bottomData}>Expenses:</td>
              <td className={s.bottomData}>
                <span className={s.expensesSum}>
                  {formatNumber(expenseSummary)}
                </span>
              </td>
            </tr>
            <tr className={s.bottomRow}>
              <td className={s.bottomData}>Income:</td>
              <td className={s.bottomData}>
                <span className={s.incomeSummary}>
                  {formatNumber(incomeSummary)}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StatisticsTable;