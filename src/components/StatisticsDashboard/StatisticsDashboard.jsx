import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';
import { useEffect } from 'react';

import s from './StatisticsDashboard.module.css';

import { setSelectedMonth, setSelectedYear } from '../../redux/statistics/slice';
import { getPeriodTransactions } from '../../redux/statistics/operations';
import { 
  selectSelectedMonth, 
  selectSelectedYear 
} from '../../redux/statistics/selectors';
import { month, yearOption } from '../../utils/monthAndYearStatistics';

const StatisticsDashboard = () => {
  const dispatch = useDispatch();
  
  const selectedMonth = useSelector(selectSelectedMonth);
  const selectedYear = useSelector(selectSelectedYear);

  const handleDateMonth = selectedMonth => {
    dispatch(setSelectedMonth(selectedMonth.value));
  };

  const handleDateYear = selectedYear => {
    dispatch(setSelectedYear(selectedYear.value));
  };

  useEffect(() => {
    dispatch(getPeriodTransactions({ month: selectedMonth, year: selectedYear }));
  }, [dispatch, selectedMonth, selectedYear]);

  const currentMonthOption = month.find(option => option.value === selectedMonth);
  const currentYearOption = yearOption.find(option => option.value === selectedYear);

  return (
    <div className={s.selectBox}>
      <Select
        className={s.select}
        options={month}
        onChange={handleDateMonth}
        value={currentMonthOption}
        isSearchable={false}
        classNamePrefix="react-select"
      />
      <Select
        className={s.select}
        options={yearOption}
        onChange={handleDateYear}
        value={currentYearOption}
        isSearchable={false}
        classNamePrefix="react-select"
      />
    </div>
  );
};

export default StatisticsDashboard;
