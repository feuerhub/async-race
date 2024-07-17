import { Button } from '../Button/Button';
import styles from './Header.module.css';

export function Header() {
    return <header className={styles.header}>
        <nav className={styles.nav}>
            <Button btnText={'Garage'} type='button' onClick={() => {}} />
            <Button btnText={'Winners'} type='button' onClick={() => {}} />
        </nav>
        <h2 className={styles.logo}>ASYNC RACE</h2>
    </header>;
}