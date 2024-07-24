import { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectAllWinners } from '../winnersSlice';
import { selectAllCars } from '../../garage/garageSlice';
import styles from './WinnersTable.module.css';
import { CarIcon } from '../../../components/CarIcon/CarIcon';
import { Pagination } from '../../../components/Pagination/Pagination';
import { Winner } from '../winnerType';
import { Car } from '../../garage/garageTypes';

type SortCriteria = {
  key: 'id' | 'wins' | 'time';
  direction: 'asc' | 'desc';
}

export function WinnersTable() {
  const winners = useSelector(selectAllWinners) as Winner[];
  const cars = useSelector(selectAllCars) as Car[];

  const [page, setPage] = useState<number>(1);
  const [sortCriteria, setSortCriteria] = useState<SortCriteria>({ key: 'id', direction: 'asc' });

  const carMap = new Map<number, Car>(cars.map(car => [car.id, car]));
  const winnersData = winners.map(winner => {
    const car = carMap.get(winner.id);
    return car && { id: winner.id, name: car.name, color: car.color, wins: winner.wins, time: winner.time };
  }).filter((winner): winner is { id: number; name: string; color: string; wins: number; time: number } => winner !== undefined);

  const sortedWinnersData = [...winnersData].sort((a, b) => {
    if (sortCriteria.direction === 'asc') {
      return a[sortCriteria.key] > b[sortCriteria.key] ? 1 : -1;
    } else {
      return a[sortCriteria.key] < b[sortCriteria.key] ? 1 : -1;
    }
  });

  const itemsPerPage = 10;
  const totalPages = Math.ceil(sortedWinnersData.length / itemsPerPage);
  const startIndex = (page - 1) * itemsPerPage;
  const paginatedWinners = sortedWinnersData.slice(startIndex, startIndex + itemsPerPage);

  const handleSort = (key: 'wins' | 'time') => {
    setSortCriteria(prevSortCriteria => {
      const direction = prevSortCriteria.key === key && prevSortCriteria.direction === 'asc' ? 'desc' : 'asc';
      return { key, direction };
    });
  };

  return (
    <div>
      <h4>Winners ({winnersData.length})</h4>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>#</th>
            <th>Car</th>
            <th>Name</th>
            <th onClick={() => handleSort('wins')} style={{ cursor: 'pointer' }}>
              Wins {sortCriteria.key === 'wins' && (sortCriteria.direction === 'asc' ? '↑' : '↓')}
            </th>
            <th onClick={() => handleSort('time')} style={{ cursor: 'pointer' }}>
              Best Time (Seconds) {sortCriteria.key === 'time' && (sortCriteria.direction === 'asc' ? '↑' : '↓')}
            </th>
          </tr>
        </thead>
        <tbody>
          {paginatedWinners.map((winner, index) => (
            <tr key={winner.id}>
              <td>{startIndex + index + 1}</td>
              <td><CarIcon color={winner.color} /></td>
              <td>{winner.name}</td>
              <td>{winner.wins}</td>
              <td>{winner.time}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination page={page} totalPages={totalPages} setPage={setPage} />
    </div>
  );
}
