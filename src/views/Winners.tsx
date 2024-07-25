import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../app/store';
import { selectCurrentWinnersPage, selectTotalWinners, selectTotalWinnersPages, setWinnersPage } from '../features/winners/winnersSlice';
import { WinnersTable } from '../features/winners/components/WinnersTable';
import { Pagination } from '../components';

import styles from './Winners.module.css';

export function Winners() {
  const dispatch = useDispatch<AppDispatch>();
  const totalPages = useSelector(selectTotalWinnersPages);
  const currentPage = useSelector(selectCurrentWinnersPage);
  const totalWinners = useSelector(selectTotalWinners);
  return (
    <main className={styles.winners}>
      <h4>Winners ({totalWinners > 0 ? totalWinners : 'No Winners'})</h4>
      <WinnersTable />
      <Pagination page={currentPage} totalPages={totalPages} setPage={(page) => dispatch(setWinnersPage(page))} />
    </main>
  );
}

