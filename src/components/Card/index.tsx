import styles from "@/styles/style.module.css";
import Image from "next/image";

interface Props {
    link: string;
    title: string;
    center: string;
    date_created: string;
}

function Card({ link, title, center, date_created }: Props) {
    return (
        <div className={styles.card}>
            {link ? <Image src={link} className={styles.img} alt={title} /> : ""}
            <p>{title}</p>
            <p>Center: {center}</p>
            <p>Created at: {date_created}</p>
        </div>
    );
}

export default Card;
