import { useSelector } from "react-redux";
import { selectAllCars } from "../garageSlice";
import { CarIcon } from "../../../components/CarIcon/CarIcon";

export function CarTrack() {
    const cars = useSelector(selectAllCars);
    return <div>
        {cars.map(car => <CarIcon color={car.color} />)}
    </div>;
}