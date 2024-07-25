import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { CarTrack } from '../CarTrack/CarTrack';
import { selectAllCars, selectCarsPerPage, selectCurrentCarsPage } from '../../garageSlice';
import { Button } from '../../../../components';
import { generateRandomCars } from '../../../../utils/generateRandomCars';
import { AppDispatch } from '../../../../app/store';
import { createCar } from '../../garageThunks';
import { CreateCarForm } from '../CreateCarForm/CreateCarForm';
import { UpdateCarForm } from '../UpdateCarForm/UpdateCarForm';
import { selectAllWinners } from '../../../winners/winnersSlice';
import { addWinner, updateWinner } from '../../../winners/winnersThunk';
import { selectAllEngineStatuses } from '../../../engine/engineSlice';
import { Modal } from '../../../../components/';
import {
  startEngine,
  stopEngine,
  switchToDrive,
} from '../../../engine/engineThunks';

import styles from './CarTracks.module.css';


export function CarTracks() {
  const [selectedCar, setSelectedCar] = useState<null | number>(null);
  const [winner, setWinner] = useState<null | number>(null);
  const [raceStarted, setRaceStarted] = useState<boolean>(false);

  const dispatch = useDispatch<AppDispatch>();
  const engines = useSelector(selectAllEngineStatuses);
  const winners = useSelector(selectAllWinners);
  const cars = useSelector(selectAllCars);
  const currentPage = useSelector(selectCurrentCarsPage);
  const carsPerPage = useSelector(selectCarsPerPage);
  const paginatedCars = cars.slice((currentPage-1)*carsPerPage, (currentPage-1)*carsPerPage + carsPerPage);

  const handleOnClickGenerateCars = () => {
    const randomCars = generateRandomCars(100);
    randomCars.forEach((car) => dispatch(createCar(car)));
  };
  const handleOnClickEngine = (engine: 'start' | 'stop', id: number) => {
    if (engine === 'start') {
      dispatch(startEngine(id));
      dispatch(switchToDrive(id));
    } else {
      dispatch(stopEngine(id));
    }
  };
  const handleOnClickRace = () => {
    handleOnClickReset();
    setRaceStarted(true);
    paginatedCars.forEach((car) => dispatch(startEngine(car.id)));
    paginatedCars.forEach((car) => dispatch(switchToDrive(car.id)));
  };
  const handleOnClickReset = () => {
    setWinner(null);
    engines.forEach((engine) => dispatch(stopEngine(engine.id)));
    setRaceStarted(false);
  };
  const handleGetWinner = (id: number) => {
    if (!winner && raceStarted) {
      setWinner(id);
      addWinnerToWinners();
    }
  };
  const addWinnerToWinners = () => {
    const winnerInWinners = winners.find((car) => car.id === winner);
    let finishTime = engines.find((engine) => engine.id === winner)?.velocity;
    finishTime = finishTime ? parseFloat((2000 / finishTime).toFixed(2)) : 0;
    if (winnerInWinners && winner) {
      const wins = winnerInWinners.wins + 1;
      const time =
        winnerInWinners.time > finishTime ? finishTime : winnerInWinners.time;
      dispatch(updateWinner({ id: winner, time: time, wins: wins }));
    } else if (!winnerInWinners && winner) {
      dispatch(addWinner({ id: winner, time: finishTime, wins: 1 }));
    }
  };

  useEffect(() => {
    winner && addWinnerToWinners();
  }, [winner]);

  return (
    <div className={styles.carTracks}>
      <div className={styles.btnPanel}>
        <div className={styles.btnPanelLeft}>
          <Button
            btnText="RACE"
            type="button"
            onClick={handleOnClickRace}
            disabled={raceStarted}
          />
          <Button btnText="RESET" type="button" onClick={handleOnClickReset} />
        </div>
        <CreateCarForm raceStarted={raceStarted} />
        <UpdateCarForm raceStarted={raceStarted} selectedCar={selectedCar} />
        <Button
          btnText="GENERATE CARS"
          type="button"
          onClick={handleOnClickGenerateCars}
        />
      </div>
      <div>
        {paginatedCars.map((car) => (
          <CarTrack
            handleCarFinished={handleGetWinner}
            key={car.id}
            id={car.id}
            name={car.name}
            color={car.color}
            selected={selectedCar === car.id}
            onClickSelect={() => setSelectedCar(car.id)}
            handleOnClickEngine={handleOnClickEngine}
            raceStarted={raceStarted}
          />
        ))}
      </div>
      {winner && <Modal id={winner} />}
    </div>
  );
}
