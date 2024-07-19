import { CarTracks } from "../features/garage/components/CarTracks/CarTracks";

import styles from './Garage.module.css';

export function Garage() {
    return <main className={styles.garage}>
        <h4>Garage</h4>
        <CarTracks />
    </main>;
}