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


export function CarTracks() {
    const [selectedCar, setSelectedCar] = useState<null | number>(null);
    const dispatch = useDispatch<AppDispatch>();
    const handleGenerateCars = () => {
        const randomCars = generateRandomCars(5);
        randomCars.forEach(
            car => dispatch(createCar(car))
        );
    }
    const cars = useSelector(selectAllCars);
    return <div className={styles.carTracks}>
        <div className={styles.btnPanel}>
            <div className={styles.btnPanelLeft}>
                <Button btnText="RACE" type="button" />
                <Button btnText="RESET" type="button" />
            </div>
            <CreateCarForm />
            <UpdateCarForm selectedCar={selectedCar} />
            <Button btnText="GENERATE CARS" type="button" onClick={handleGenerateCars} />
        </div>
        <div>
            {cars.map(car => 
            <CarTrack 
            key={car.id} 
            id={car.id}
            name={car.name} 
            color={car.color} 
            selected={selectedCar === car.id} 
            onClickSelect={() => setSelectedCar(car.id)} />)}
        </div>
    </div>;
}