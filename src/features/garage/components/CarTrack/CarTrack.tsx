import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../../app/store";
import { deleteCar } from "../../garageThunks";
import { CarIcon } from "../../../../components/CarIcon/CarIcon";
import { Button } from "../../../../components";

import styles from './CarTrack.module.css';
import { startStopEngine } from "../../../engine/engineThunks";
import { selectAllEngineStatuses } from "../../../engine/engineSlice";

type CarTrackProps = {
    id: number,
    name: string, 
    color: string,
    selected: boolean,
    onClickSelect: () => void
}

export function CarTrack({ id, name, color, selected, onClickSelect }: CarTrackProps) {
            const dispatch = useDispatch<AppDispatch>();
            const engineStatuses = useSelector(selectAllEngineStatuses);
            const engineStatus = engineStatuses.filter(status => status.id === id);
            console.log(engineStatus);
            const handleClickDelete = () => {
                dispatch(deleteCar(id));
            }
            const handleClickEngine = (status: 'started' | 'stopped') => {
                dispatch(startStopEngine({carId: id, status: status}));
            }
            return <div className={styles.carTrack}>
                <div className={styles.leftContainer}>
                    <div className={styles.btnContainer}>
                        <Button btnText="SELECT" type="button" onClick={onClickSelect} disabled={selected} />
                        <Button btnText="REMOVE" type="button" onClick={handleClickDelete} />
                    </div>
                    <div className={styles.btnContainer}>
                        <Button btnText="A" type="button" onClick={() => handleClickEngine('started')} disabled={engineStatus.length>0} />
                        <Button btnText="B" type="button" onClick={() => handleClickEngine('stopped')} disabled={engineStatus.length<1} />
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