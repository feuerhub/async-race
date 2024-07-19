import styles from './Button.module.css';

type ButtonProps = {
    btnText: string,
    type: "submit" | "reset" | "button" | undefined
    onClick?: () => void,
    disabled?: boolean
}

export function Button({ btnText, type, onClick, disabled }: ButtonProps) {
    return <button onClick={onClick} type={type} className={styles.button} disabled={disabled}>{ btnText }</button>;
}