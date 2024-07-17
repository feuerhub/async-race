type ButtonProps = {
    btnText: string,
    type: "submit" | "reset" | "button" | undefined
    onClick?: () => void,
}

export function Button({ btnText, type, onClick }: ButtonProps) {
    return <button onClick={onClick} type={type}>{ btnText }</button>;
}