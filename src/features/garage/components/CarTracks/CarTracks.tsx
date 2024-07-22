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

import styles from './CarTracks.module.css';
import { Pagination } from "../../../../components/Pagination/Pagination";
import { startStopEngine, switchToDriveMode } from "../../../engine/engineThunks";

export function CarTracks() {
    const [selectedCar, setSelectedCar] = useState<null | number>(null);
    const [page, setPage] = useState<number>(1);
    const dispatch = useDispatch<AppDispatch>();
    const cars = useSelector(selectAllCars);
    const handleOnClickGenerateCars = () => {
        const randomCars = generateRandomCars(5);
        randomCars.forEach(
            car => dispatch(createCar(car))
        );
    }
    const handleOnClickEngine = (status: 'started' | 'stopped', id: number) => {
        dispatch(startStopEngine({ carId: id, status: status }));
        if (status === 'started') {
            dispatch(switchToDriveMode(id));
    }
    }
    const handleOnClickRace = () => {
        paginatedCars.forEach(car => dispatch(startStopEngine({ carId: car.id, status: 'stopped' })));
        paginatedCars.forEach(car => dispatch(startStopEngine({ carId: car.id, status: 'started' })));
        paginatedCars.forEach(car => dispatch(switchToDriveMode(car.id)));
    }

    const itemsPerPage = 7;
    const totalPages = Math.ceil(cars.length / itemsPerPage);
    const startIndex = (page-1) * itemsPerPage;
    const paginatedCars = cars.slice(startIndex, startIndex + itemsPerPage);  

    return <div className={styles.carTracks}>
        <div className={styles.btnPanel}>
            <div className={styles.btnPanelLeft}>
                <Button btnText="RACE" type="button" onClick={handleOnClickRace} />
                <Button btnText="RESET" type="button" onClick={() => location.reload()} />
            </div>
            <CreateCarForm />
            <UpdateCarForm selectedCar={selectedCar} />
            <Button btnText="GENERATE CARS" type="button" onClick={handleOnClickGenerateCars} />
        </div>
        <div>
            {paginatedCars.map(car => 
            <CarTrack 
            key={car.id} 
            id={car.id}
            name={car.name} 
            color={car.color} 
            selected={selectedCar === car.id} 
            onClickSelect={() => setSelectedCar(car.id)}
            handleOnClickEngine={handleOnClickEngine} />)}
        </div>
        <Pagination page={page} totalPages={totalPages} setPage={setPage} />
    </div>;
}