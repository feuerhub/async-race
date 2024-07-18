import { Button } from "../Button/Button";

export function Form({ inputPlaceholder, btnText }: { inputPlaceholder: string, btnText: string }) {
    return <form>
        <input type="text" placeholder={inputPlaceholder}></input>
        <input type="color" />
        <Button btnText={btnText} type='submit' />
    </form>;
}