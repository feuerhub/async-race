import { useSelector } from 'react-redux';
import styles from './Modal.module.css';
import { selectAllCars } from '../../features/garage/garageSlice';
import { selectAllEngineStatuses } from '../../features/engine/engineSlice';


export function Modal({id}: {id: number}) {
    const carName = useSelector(selectAllCars).filter(car => car.id === id)[0].name;
    const finishTime = parseFloat((1000 / useSelector(selectAllEngineStatuses).filter(car => car.id === id)[0].velocity).toFixed(2));
    return <div className={styles.modal}>
        <h4>{carName} Won!</h4>
        <h6>Finished In {finishTime} Seconds</h6>
    </div>
}