import { FormEventHandler } from "react";
import { Button } from "../Button/Button";

import styles from './Form.module.css';

type FormProps = { 
    inputPlaceholder: string, 
    btnText: string,
    textValue: string,
    colorValue: string,
    onSubmit: FormEventHandler<HTMLFormElement>,
    onInputText: FormEventHandler<HTMLInputElement>,
    onInputColor: FormEventHandler<HTMLInputElement>,
    disabled: boolean
 }

export function Form({ inputPlaceholder, btnText, textValue, colorValue, onSubmit, onInputColor, onInputText, disabled }: FormProps) {
    return <form onSubmit={onSubmit} className={styles.form}>
        <input type="text" placeholder={inputPlaceholder} value={textValue} onInput={onInputText}></input>
        <input className={styles.colorPicker} type="color" value={colorValue} onInput={onInputColor} />
        <Button btnText={btnText} type='submit' disabled={disabled} />
    </form>;
}