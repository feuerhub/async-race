// import { useState } from 'react';
// import { useSelector } from 'react-redux';
// import { selectAllWinners, selectCurrentWinnersPage } from '../winnersSlice';
// import { selectAllCars } from '../../garage/garageSlice';
// import styles from './WinnersTable.module.css';
// import { CarIcon } from '../../../components/CarIcon/CarIcon';
// import { Winner } from '../winnerType';
// import { Car } from '../../garage/garageTypes';

// type SortCriteria = {
//   sortBy: 'wins' | 'time';
//   sortDirection: 'asc' | 'desc';
// };

// export function WinnersTable() {
//   const winners = useSelector(selectAllWinners) as Winner[];
//   const cars = useSelector(selectAllCars) as Car[];
//   const currentPage = useSelector(selectCurrentWinnersPage);
//   const [sortCriteria, setSortCriteria] = useState<SortCriteria>();


//   const carMap = new Map<number, Car>(cars.map((car) => [car.id, car]));
//   const winnersData = winners.slice((currentPage-1)*10, (currentPage-1)*10+10)
//     .map((winner) => {
//       const car = carMap.get(winner.id);
//       return (
//         car && {
//           id: winner.id,
//           name: car.name,
//           color: car.color,
//           wins: winner.wins,
//           time: winner.time,
//         }
//       );
//     })
//     .filter(
//       (
//         winner,
//       ): winner is {
//         id: number;
//         name: string;
//         color: string;
//         wins: number;
//         time: number;
//       } => winner !== undefined,
//     );

//   const sortedWinnersData = [...winnersData].sort((a, b) => {
//     if (sortCriteria.sortDirection === 'asc') {
//       return a[sortCriteria.sortBy] > b[sortCriteria.sortBy] ? 1 : -1;
//     } else {
//       return a[sortCriteria.sortBy] < b[sortCriteria.sortBy] ? 1 : -1;
//     }
//   });

//   const handleSort = (sortBy: 'wins' | 'time') => {
//     setSortCriteria((prevSortCriteria) => {
//       const sortDirection =
//         prevSortCriteria.sortBy === sortBy && prevSortCriteria.sortDirection === 'asc'
//           ? 'desc'
//           : 'asc';
//       return { sortBy, sortDirection };
//     });
//   };

//   return (
//       <table className={styles.table}>
//         <thead>
//           <tr>
//             <th>#</th>
//             <th>Car</th>
//             <th>Name</th>
//             <th
//               onClick={() => handleSort('wins')}
//               style={{ cursor: 'pointer' }}
//             >
//               Wins
//               {sortCriteria.sortBy === 'wins' &&
//                 (sortCriteria.sortDirection === 'asc' ? ' ↑' : ' ↓')}
//             </th>
//             <th
//               onClick={() => handleSort('time')}
//               style={{ cursor: 'pointer' }}
//             >
//               Best Time (Seconds)
//               {sortCriteria.sortBy === 'time' &&
//                 (sortCriteria.sortDirection === 'asc' ? ' ↑' : ' ↓')}
//             </th>
//           </tr>
//         </thead>
//         <tbody>
//           {winnersData.map((winner, index) => (
//             <tr key={winner.id}>
//               <td>{((currentPage - 1) * 10) + index + 1}</td>
//               <td>
//                 <CarIcon color={winner.color} />
//               </td>
//               <td>{winner.name}</td>
//               <td>{winner.wins}</td>
//               <td>{winner.time}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//   );
// }
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectAllWinners, selectCurrentWinnersPage } from '../winnersSlice';
import { selectAllCars } from '../../garage/garageSlice';
import styles from './WinnersTable.module.css';
import { CarIcon } from '../../../components/CarIcon/CarIcon';
import { Winner } from '../winnerType';
import { Car } from '../../garage/garageTypes';

type SortCriteria = {
  sortBy: 'wins' | 'time';
  sortDirection: 'asc' | 'desc';
};

export function WinnersTable() {
  const winners = useSelector(selectAllWinners) as Winner[];
  const cars = useSelector(selectAllCars) as Car[];
  const currentPage = useSelector(selectCurrentWinnersPage);
  const [sortCriteria, setSortCriteria] = useState<SortCriteria | undefined>(undefined);

  const carMap = new Map<number, Car>(cars.map((car) => [car.id, car]));
  const sortedWinnersData = sortCriteria
    ? [...winners].sort((a, b) => {
        if (sortCriteria.sortDirection === 'asc') {
          return a[sortCriteria.sortBy] > b[sortCriteria.sortBy] ? 1 : -1;
        } else {
          return a[sortCriteria.sortBy] < b[sortCriteria.sortBy] ? 1 : -1;
        }
      })
    : winners;
    const winnersData = sortedWinnersData.slice((currentPage - 1) * 10, (currentPage - 1) * 10 + 10)
    .map((winner) => {
      const car = carMap.get(winner.id);
      return (
        car && {
          id: winner.id,
          name: car.name,
          color: car.color,
          wins: winner.wins,
          time: winner.time,
        }
      );
    })
    .filter(
      (
        winner,
      ): winner is {
        id: number;
        name: string;
        color: string;
        wins: number;
        time: number;
      } => winner !== undefined,
    );

  const handleSort = (sortBy: 'wins' | 'time') => {
    setSortCriteria((prevSortCriteria) => {
      const sortDirection =
        prevSortCriteria?.sortBy === sortBy && prevSortCriteria.sortDirection === 'asc'
          ? 'desc'
          : 'asc';
      return { sortBy, sortDirection };
    });
  };

  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th>#</th>
          <th>Car</th>
          <th>Name</th>
          <th onClick={() => handleSort('wins')} style={{ cursor: 'pointer' }}>
            Wins
            {sortCriteria?.sortBy === 'wins' &&
              (sortCriteria.sortDirection === 'asc' ? ' ↑' : ' ↓')}
          </th>
          <th onClick={() => handleSort('time')} style={{ cursor: 'pointer' }}>
            Best Time (Seconds)
            {sortCriteria?.sortBy === 'time' &&
              (sortCriteria.sortDirection === 'asc' ? ' ↑' : ' ↓')}
          </th>
        </tr>
      </thead>
      <tbody>
        {winnersData.map((winner, index) => (
          <tr key={winner.id}>
            <td>{((currentPage - 1) * 10) + index + 1}</td>
            <td>
              <CarIcon color={winner.color} />
            </td>
            <td>{winner.name}</td>
            <td>{winner.wins}</td>
            <td>{winner.time}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
