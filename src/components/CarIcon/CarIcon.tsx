import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCarSide  } from '@fortawesome/free-solid-svg-icons';

import styles from './CarIcon.module.css';

type CarIconProps = {
    color: string,
    velocity?: number,
    drive?: "started" | "broke" | "drive"
}

export function CarIcon({ color, velocity, drive }: CarIconProps) {
    const cx = classNames.bind(styles);
    const animationDurationStyle = drive ? {
        animationDuration: `${velocity && velocity*50}ms`,
      } : {};
    return <FontAwesomeIcon className={cx('car', drive)} style={animationDurationStyle} icon={faCarSide} color={color} />;
}