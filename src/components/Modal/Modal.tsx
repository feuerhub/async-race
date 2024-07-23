import styles from './Modal.module.css';

type ModalProps = {
    name: string,
    time: number
}

export function Modal({name, time}: ModalProps) {
    return <div className={styles.modal}>
        <h4>{name} Won!</h4>
        <h6>Time: {time}</h6>
    </div>
}