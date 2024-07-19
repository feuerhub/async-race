import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../../app/store";
import { deleteCar } from "../../garageThunks";
import { CarIcon } from "../../../../components/CarIcon/CarIcon";
import { Button } from "../../../../components";

import styles from './CarTrack.module.css';

type CarTrackProps = {
    id: number,
    name: string, 
    color: string,
    selected: boolean,
    onClickSelect: () => void
}

export function CarTrack({ id, name, color, selected, onClickSelect }: CarTrackProps) {
            const dispatch = useDispatch<AppDispatch>();
            const handleClickDelete = () => {
                dispatch(deleteCar(id));
            }
            return <div className={styles.carTrack}>
                <div className={styles.leftContainer}>
                    <div className={styles.btnContainer}>
                        <Button btnText="SELECT" type="button" onClick={onClickSelect} disabled={selected} />
                        <Button btnText="REMOVE" type="button" onClick={handleClickDelete} />
                    </div>
                    <div className={styles.btnContainer}>
                        <Button btnText="A" type="button" />
                        <Button btnText="B" type="button" />
                    </div>
                    <CarIcon color={color} />
                </div>
                <div className={styles.trackroad}>
                    <div>
                        <p>START</p>
                        <h4 className={styles.carName}>{name}</h4>
                    </div>
                    <p>FINISH</p>
                </div>
            </div>;
}