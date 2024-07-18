import { CarIcon } from "../../../components/CarIcon/CarIcon";
import { Button } from "../../../components";

import styles from './CarTrack.module.css';

export function CarTrack({ name, color }: {name: string, color: string}) {
            return <div className={styles.carTrack}>
                <div className={styles.leftContainer}>
                    <div className={styles.btnContainer}>
                        <Button btnText="SELECT" type="button" />
                        <Button btnText="REMOVE" type="button" />
                    </div>
                    <div className={styles.btnContainer}>
                        <Button btnText="A" type="button" />
                        <Button btnText="B" type="button" />
                    </div>
                    <CarIcon color={color} />
                </div>
                <div>
                    <h4>{name}</h4>
                </div>
            </div>;
}