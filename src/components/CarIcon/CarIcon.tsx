import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCarSide, faCarBurst  } from '@fortawesome/free-solid-svg-icons';

import styles from './CarIcon.module.css';

type CarIconProps = {
    color: string,
    velocity?: number,
    engineStatus?: 'started' | 'drive' | 'broken',
    id?: number,
    handleCarFinished?: (id: number) => void,
}

export function CarIcon({ color, velocity, engineStatus, id, handleCarFinished }: CarIconProps) {
    const cx = classNames.bind(styles);
    const animationStyle = engineStatus ? {
        animationDuration: velocity ? `${500000 / velocity}ms` : undefined
      } : {};
    return <FontAwesomeIcon 
    onAnimationEnd={() => (handleCarFinished && id) && handleCarFinished(id)} 
    className={cx('car', engineStatus && 'drive', engineStatus === 'broken' && 'broken')} 
    style={animationStyle} icon={engineStatus === 'broken' ? faCarBurst : faCarSide } 
    color={color} />;
}