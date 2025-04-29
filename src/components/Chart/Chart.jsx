import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { useSelector } from 'react-redux';

import s from './Chart.module.css';

import { selectPeriodTransactions } from '../../redux/statistics/selectors';
import {
  backgroundColor,
  hoverBackgroundColor,
  options,
} from '../../utils/statisticsColors';

ChartJS.register(ArcElement, Tooltip, Legend);

const Chart = () => {
  const { categoriesSummary = [], periodTotal = 0 } = useSelector(
    selectPeriodTransactions
  );
  const categoriesNames = categoriesSummary.filter(
    category => category.type === 'EXPENSE'
  );

  const formatNumber = sum => {
    const [integerPart, decimalPart] = sum.toFixed(2).split('.');
    const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
    return `${formattedInteger}.${decimalPart}`;
  };


  if (categoriesNames.length === 0) {
    return (
      <div className={s.noTransactionsBox}>
        <p className={s.noTransactionsText}>There are no expenses for the selected period</p>
        <p className={s.noTransactionsText}>Income for this month: <br />₴ {formatNumber(periodTotal)}</p>
      </div>
    );
  }

  const data = {
    labels: categoriesNames.map(category => category.name),
    datasets: [
      {
        data: categoriesNames.map(category => category.total),
        backgroundColor,
        borderWidth: 0,
        hoverBackgroundColor,
      },
    ],
  };

  return (
    <div className={s.donutContainer}>
      <Doughnut data={data} options={options} />
      <div className={s.donutCenter}>
        <span className={s.innerText}> ₴ {formatNumber(periodTotal)}</span>
      </div>
    </div>
  );
};

export default Chart;