import StatisticsDashboard from '../../components/StatisticsDashboard/StatisticsDashboard';
import StatisticsTable from '../../components/StatisticsTable/StatisticsTable';
import Chart from '../../components/Chart/Chart';

import s from './StatisticsTab.module.css';

const StatisticsTab = () => {
  return (
    <div className={s.statisticsWrapper}>
      <div className={s.donutWrapper}>
        <h2 className={s.header}>Statistics</h2>
        <Chart />
      </div>
      <div className={s.tableWrapper}>
        <StatisticsDashboard />
        <StatisticsTable />
      </div>
    </div>
  );
};

export default StatisticsTab;