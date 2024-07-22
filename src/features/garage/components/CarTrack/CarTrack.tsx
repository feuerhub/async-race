import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../../app/store";
import { deleteCar } from "../../garageThunks";
import { CarIcon } from "../../../../components/CarIcon/CarIcon";
import { Button } from "../../../../components";
import { selectAllEngineStatuses, selectAllRaceReady } from "../../../engine/engineSlice";

import styles from './CarTrack.module.css';

type CarTrackProps = {
    id: number,
    name: string, 
    color: string,
    selected: boolean,
    onClickSelect: () => void,
    handleOnClickEngine: (status: "started" | "stopped", id: number) => void
}

export function CarTrack({ id, name, color, selected, onClickSelect, handleOnClickEngine }: CarTrackProps) {
            const dispatch = useDispatch<AppDispatch>();
            const engineStatuses = useSelector(selectAllEngineStatuses);
            const engineStatusIndex = engineStatuses.findIndex(engine => engine.id === id);
            const handleClickDelete = () => {
                dispatch(deleteCar(id));
            }
            const ready = useSelector(selectAllRaceReady);
            return <div className={styles.carTrack}>
                <div className={styles.leftContainer}>
                    <div className={styles.btnContainer}>
                        <Button btnText="SELECT" type="button" onClick={onClickSelect} disabled={selected} />
                        <Button btnText="REMOVE" type="button" onClick={handleClickDelete} />
                    </div>
                    <div className={styles.btnContainer}>
                        <Button btnText="A" type="button" onClick={() => handleOnClickEngine('started', id)} disabled={engineStatusIndex !== -1} />
                        <Button btnText="B" type="button" onClick={() => handleOnClickEngine('stopped', id)} disabled={engineStatusIndex === -1} />
                    </div>
                    <CarIcon color={color} velocity={ready ? engineStatuses[engineStatusIndex]?.velocity : 0} drive={ready ? engineStatuses[engineStatusIndex]?.status : 'started'} />
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