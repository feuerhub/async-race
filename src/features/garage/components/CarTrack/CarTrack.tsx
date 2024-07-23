import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../../app/store";
import { deleteCar } from "../../garageThunks";
import { CarIcon } from "../../../../components/CarIcon/CarIcon";
import { Button } from "../../../../components";
import { selectAllEngineStatuses } from "../../../engine/engineSlice";

import styles from './CarTrack.module.css';
import { deleteWinner } from "../../../winners/winnersThunk";

type CarTrackProps = {
    id: number,
    name: string, 
    color: string,
    selected: boolean,
    onClickSelect: () => void,
    handleOnClickEngine: (engine: "start" | "stop", id: number) => void,
    handleCarFinished: (id: number) => void
}

export function CarTrack({ id, name, color, selected, onClickSelect, handleOnClickEngine, handleCarFinished }: CarTrackProps) {
            const dispatch = useDispatch<AppDispatch>();
            const engineStatuses = useSelector(selectAllEngineStatuses);
            const carEngine = engineStatuses.find(engine => engine.id === id);
            const handleClickDelete = () => {
                dispatch(deleteCar(id));
                dispatch(deleteWinner(id));
            }
            return <div className={styles.carTrack}>
                <div className={styles.leftContainer}>
                    <div className={styles.btnContainer}>
                        <Button btnText="SELECT" type="button" onClick={onClickSelect} disabled={selected} />
                        <Button btnText="REMOVE" type="button" onClick={handleClickDelete} />
                    </div>
                    <div className={styles.btnContainer}>
                        <Button btnText="A" type="button" onClick={() => handleOnClickEngine('start', id)} disabled={carEngine && true} />
                        <Button btnText="B" type="button" onClick={() => handleOnClickEngine('stop', id)} disabled={!carEngine && true} />
                    </div>
                    <div 
                    onAnimationEnd={() => (handleCarFinished(id))}  
                    className={carEngine && styles.drive} 
                    style={carEngine?.status === 'broken' ? {animationDuration: `${2000 / carEngine.velocity}s`, animationPlayState: "paused"} : carEngine && {animationDuration: `${2000 / carEngine.velocity}s`}}>
                        <CarIcon color={color} />
                    </div>
                </div>
                <div className={styles.trackroad}>
                    <div>
                        <p>START</p>
                        <h4 className={styles.carName}>{name} {id}</h4>
                    </div>
                    <p>FINISH</p>
                </div>
            </div>;
}