// import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCarSide  } from '@fortawesome/free-solid-svg-icons';

// import styles from './CarIcon.module.css';

type CarIconProps = {
    color: string,
    // velocity?: number,
    // engineStatus?: 'started' | 'drive' | 'broken',
    // id?: number,
    // handleCarFinished?: (id: number) => void,
}

export function CarIcon({ color }: CarIconProps) {
    // const cx = classNames.bind(styles);
    // const animationStyle = engineStatus ? {
    //     animationDuration: velocity ? `${1000 / velocity}s` : undefined
    //   } : {};
    return <FontAwesomeIcon icon={ faCarSide } color={color} />;
}