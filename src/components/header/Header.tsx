import { useNavigate } from 'react-router-dom';
import { Button } from '../Button/Button';
import styles from './Header.module.css';

export function Header() {
  const navigate = useNavigate();
  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <Button
          btnText={'Garage'}
          type="button"
          onClick={() => {
            navigate('/garage');
          }}
        />
        <Button
          btnText={'Winners'}
          type="button"
          onClick={() => {
            navigate('/winners');
          }}
        />
      </nav>
      <h2 className={styles.logo}>ASYNC RACE</h2>
    </header>
  );
}
