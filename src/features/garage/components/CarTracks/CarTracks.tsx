import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { CarTrack } from "../CarTrack/CarTrack";
import { selectAllCars } from "../../garageSlice";
import { Button } from "../../../../components";
import { generateRandomCars } from "../../../../utils/generateRandomCars";
import { AppDispatch } from "../../../../app/store";
import { createCar } from "../../garageThunks";
import { CreateCarForm } from "../CreateCarForm/CreateCarForm";
import { UpdateCarForm } from "../UpdateCarForm/UpdateCarForm";
import { Pagination } from "../../../../components/Pagination/Pagination";
import { startEngine, stopEngine, switchToDrive } from "../../../engine/engineThunks";

import styles from './CarTracks.module.css';
import { selectAllWinners } from "../../../winners/winnersSlice";
import { addWinner, updateWinner } from "../../../winners/winnersThunk";

export function CarTracks() {
    const [selectedCar, setSelectedCar] = useState<null | number>(null);
    const [page, setPage] = useState<number>(1);
    const [winner, setWinner] = useState<null | number>(null);
    const [raceStarted, setRaceStarted] = useState<boolean>(false);

    const dispatch = useDispatch<AppDispatch>();
    const cars = useSelector(selectAllCars);
    const winners = useSelector(selectAllWinners);
    const handleOnClickGenerateCars = () => {
        const randomCars = generateRandomCars(5);
        randomCars.forEach(
            car => dispatch(createCar(car))
        );
    }
    const handleOnClickEngine = (engine: 'start' | 'stop', id: number) => {
        if (engine === 'start') {
            dispatch(startEngine(id));
            dispatch(switchToDrive(id));
        } else {
            dispatch(stopEngine(id));
        }
    }
    const handleOnClickRace = () => {
        setWinner(null);
        setRaceStarted(true);
        paginatedCars.forEach(car => dispatch(startEngine(car.id)));
        paginatedCars.forEach(car => dispatch(switchToDrive(car.id)));
    }
    const handleOnClickReset = () => {
        paginatedCars.forEach(car => dispatch(stopEngine(car.id)));
    }
    const handleGetWinner = (id: number) => {
        if (!winner && raceStarted) {
            setWinner(id);
            addWinnerToWinners();
        }
    }
    const addWinnerToWinners = () => {
        const isWinnerInWinners = winners.some((car) => car.id === winner);
        console.log(winner)
        if (isWinnerInWinners && winner) {
            dispatch(updateWinner({id: winner, time: 10, wins: 1}))
        } else if (!isWinnerInWinners && winner) {
            dispatch(addWinner({id: winner, time: 10, wins: 1}))
        }
    }

    const itemsPerPage = 7;
    const totalPages = Math.ceil(cars.length / itemsPerPage);
    const startIndex = (page-1) * itemsPerPage;
    const paginatedCars = cars.slice(startIndex, startIndex + itemsPerPage); 

    return <div className={styles.carTracks}>
        <div className={styles.btnPanel}>
            <div className={styles.btnPanelLeft}>
                <Button btnText="RACE" type="button" onClick={handleOnClickRace} />
                <Button btnText="RESET" type="button" onClick={handleOnClickReset} />
            </div>
            <CreateCarForm />
            <UpdateCarForm selectedCar={selectedCar} />
            <Button btnText="GENERATE CARS" type="button" onClick={handleOnClickGenerateCars} />
        </div>
        <div>
            {paginatedCars.map(car => 
            <CarTrack 
            handleCarFinished={handleGetWinner}
            key={car.id} 
            id={car.id}
            name={car.name} 
            color={car.color} 
            selected={selectedCar === car.id} 
            onClickSelect={() => setSelectedCar(car.id)}
            handleOnClickEngine={handleOnClickEngine} />)}
        </div>
        <h4>Garage ({cars.length})</h4>
        <Pagination page={page} totalPages={totalPages} setPage={setPage} />
        {winner && <h2>{winner}</h2>}
    </div>;
}