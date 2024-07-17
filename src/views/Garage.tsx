import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getCars } from "../features/garage/garageSlice";
import { AppDispatch } from "../app/store";

export function Garage() {
    const dispatch = useDispatch<AppDispatch>();
    useEffect(() => {
        dispatch(getCars());
    }, [dispatch])
    return <main>Garage</main>;
}