import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../../app/store";
import { deleteCar } from "../../garageThunks";
import { CarIcon } from "../../../../components/CarIcon/CarIcon";
import { Button } from "../../../../components";
import { selectAllEngineStatuses } from "../../../engine/engineSlice";
import classNames from 'classnames/bind';

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
    const cx = classNames.bind(styles);
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
                    
                </div>
                <div className={styles.trackroad}>
                <div 
                    onAnimationEnd={() => (handleCarFinished(id))}  
                    className={cx('singleCar', carEngine && 'drive')} 
                    style={carEngine?.status === 'broken' ? {animationDuration: `${1000 / carEngine.velocity}s`, animationPlayState: "paused"} : carEngine && {animationDuration: `${1000 / carEngine.velocity}s`}}>
                        <CarIcon color={color} />
                    </div>
                    <div className={styles.carNameBlock}>
                        <p>START</p>
                        <h4 className={styles.carName}>{name}</h4>
                    </div>
                    <p>FINISH</p>
                </div>
            </div>;
}