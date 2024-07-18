import { useSelector } from "react-redux";
import { selectAllWinners } from "../winnersSlice";
import { selectAllCars } from "../../garage/garageSlice";

import styles from './WinnersTable.module.css';

export function WinnersTable() {
    const winners = useSelector(selectAllWinners);
    const cars = useSelector(selectAllCars);
    const carMap = new Map(cars.map(car => [car.id, car]));
    const filteredCars = winners.map(item => {
        const car = carMap.get(item.id);
        return car ? {...item, ...car} : item;
    });
    return <table className={styles.table}>
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
                {filteredCars.map(item => {
                    return <tr key={item.id}>
                        <td>{item.id}</td>
                        <td>{item.color}</td>
                        <td>{item.name}</td>
                        <td>{item.wins}</td>
                        <td>{item.time}</td>
                    </tr>
                })}
        </tbody>
    </table>
}