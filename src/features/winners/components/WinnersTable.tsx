import { useSelector } from "react-redux";
import { selectAllWinners } from "../winnersSlice";
import { selectAllCars } from "../../garage/garageSlice";

import styles from './WinnersTable.module.css';
import { CarIcon } from "../../../components/CarIcon/CarIcon";
import { Pagination } from "../../../components/Pagination/Pagination";
import { useState } from "react";

export function WinnersTable() {
    const winners = useSelector(selectAllWinners);
    const cars = useSelector(selectAllCars);

    const [page, setPage] = useState(1);

    const carMap = new Map(cars.map(car => [car.id, car]));
    const winnersData = winners.map(winner => {
        const car = carMap.get(winner.id);
        return car && {id: winner.id, name: car.name, color: car.color, wins: winner.wins, time: winner.time };
    });

    const itemsPerPage = 10;
    const totalPages = Math.ceil(winnersData.length / itemsPerPage);
    const startIndex = (page-1) * itemsPerPage;
    const paginatedWinners = winnersData.slice(startIndex, startIndex + itemsPerPage); 

    return <div>
        <h4>Winners ({winnersData.length})</h4>
        <table className={styles.table}>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Car</th>
                    <th>Name</th>
                    <th>Wins</th>
                    <th>Best Time (Seconds)</th>
                </tr>
            </thead>
            <tbody>
                    {paginatedWinners.map(winner => {
                        return winner && <tr key={winner.id}>
                            <td>{winner.id}</td>
                            <td>{<CarIcon color={winner.color} />}</td>
                            <td>{winner.name}</td>
                            <td>{winner.wins}</td>
                            <td>{winner.time}</td>
                        </tr>
                    })}
            </tbody>
        </table>
        <Pagination page={page} totalPages={totalPages} setPage={setPage} />
    </div>
}