import { WinnersTable } from '../features/winners/components/WinnersTable'

import styles from './Winners.module.css';

export function Winners() {
    return <main className={styles.winners}>
        <WinnersTable />
    </main>;
}