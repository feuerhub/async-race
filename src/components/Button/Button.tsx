import styles from './Button.module.css';

type ButtonProps = {
    btnText: string,
    type: "submit" | "reset" | "button" | undefined
    onClick?: () => void,
}

export function Button({ btnText, type, onClick }: ButtonProps) {
    return <button onClick={onClick} type={type} className={styles.button}>{ btnText }</button>;
}