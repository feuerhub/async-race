import { useDispatch, useSelector } from "react-redux";
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
    const dispatch = useDispatch<AppDispatch>();
    const handleGenerateCars = () => {
        const randomCars = generateRandomCars(5);
        randomCars.forEach(
            car => dispatch(createCar(car))
        );
    }
    const cars = useSelector(selectAllCars);
    return <div className={styles.carTracks}>
        <div className={styles.top}>
            <div className={styles.topLeftBtns}>
                <Button btnText="RACE" type="button" />
                <Button btnText="RESET" type="button" />
            </div>
            <CreateCarForm />
            <UpdateCarForm />
            <Button btnText="GENERATE CARS" type="button" onClick={handleGenerateCars} />
        </div>
        <div>
            {cars.map(car => <CarTrack key={car.id} name={car.name} color={car.color} />)}
        </div>
    </div>;
}