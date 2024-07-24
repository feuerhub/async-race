import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
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
import { selectAllEngineStatuses } from "../../../engine/engineSlice";
import { Modal } from "../../../../components/Modal/Modal";

export function CarTracks() {
    const [selectedCar, setSelectedCar] = useState<null | number>(null);
    const [page, setPage] = useState<number>(1);
    const [winner, setWinner] = useState<null | number>(null);
    const [raceStarted, setRaceStarted] = useState<boolean>(false);

    const dispatch = useDispatch<AppDispatch>();

    const cars = useSelector(selectAllCars);
    const engines = useSelector(selectAllEngineStatuses);
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
        handleOnClickReset();
        setRaceStarted(true);
        paginatedCars.forEach(car => dispatch(startEngine(car.id)));
        paginatedCars.forEach(car => dispatch(switchToDrive(car.id)));
    }
    const handleOnClickReset = () => {
        setWinner(null);
        engines.forEach(engine => dispatch(stopEngine(engine.id)));
        setRaceStarted(false);
    }
    const handleGetWinner = (id: number) => {
        if (!winner && raceStarted) {
            setWinner(id);
            addWinnerToWinners();
        }
    }
    const addWinnerToWinners = () => {
        const isWinnerInWinners = winners.some((car) => car.id === winner);
        let finishTime = engines.find(engine => engine.id === winner)?.velocity;
        finishTime = finishTime ? parseFloat((1000 / finishTime).toFixed(2)) : 0;
        if (isWinnerInWinners && winner) {
            dispatch(updateWinner({id: winner, time: finishTime, wins: 1}));
        } else if (!isWinnerInWinners && winner) {
            dispatch(addWinner({id: winner, time: finishTime, wins: 1}));
        }
    }

    useEffect(() => {
        winner && addWinnerToWinners();
      }, [winner]);

    const itemsPerPage = 7;
    const totalPages = Math.ceil(cars.length / itemsPerPage);
    const startIndex = (page-1) * itemsPerPage;
    const paginatedCars = cars.slice(startIndex, startIndex + itemsPerPage); 

    return <div className={styles.carTracks}>
        <div className={styles.btnPanel}>
            <div className={styles.btnPanelLeft}>
                <Button btnText="RACE" type="button" onClick={handleOnClickRace} disabled={raceStarted} />
                <Button btnText="RESET" type="button" onClick={handleOnClickReset} />
            </div>
            <CreateCarForm />
            <UpdateCarForm selectedCar={selectedCar} />
            <Button btnText="GENERATE CARS" type="button" onClick={handleOnClickGenerateCars} />
        </div>
        <h4>Garage ({cars.length})</h4>
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
        <Pagination page={page} totalPages={totalPages} setPage={setPage} />
        {winner && <Modal id={winner} />}
    </div>;
}