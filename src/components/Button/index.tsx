import { MouseEventHandler, ReactNode } from "react";
import styles from "@/styles/style.module.css";

interface Props {
    children: ReactNode;
    onClick?: MouseEventHandler<HTMLButtonElement>;
}

function Button({ children, onClick }: Props) {
    return (
        <button onClick={onClick} className={styles.btn}>
            {children}
        </button>
    );
}
export default Button;
