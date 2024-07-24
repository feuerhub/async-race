import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCarSide  } from '@fortawesome/free-solid-svg-icons';

// import styles from './CarIcon.module.css';

type CarIconProps = {
    color: string,
}

export function CarIcon({ color }: CarIconProps) {
    return <FontAwesomeIcon icon={ faCarSide } color={color} />;
}