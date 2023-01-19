import styles from "@/styles/style.module.css";

interface Props {
    index: number;
    link: string;
    title: string;
    center: string;
    date_created: string;
}

function Card({ index, link, title, center, date_created }: Props) {
    return (
        <div key={index} className={styles.card}>
            {link ? <img src={link} className={styles.img} alt={title} /> : ""}
            <p>{title}</p>
            <p>Center: {center}</p>
            <p>Created at: {date_created}</p>
        </div>
    );
}

export default Card;
