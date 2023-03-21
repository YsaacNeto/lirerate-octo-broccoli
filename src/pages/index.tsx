import Head from "next/head";
import styles from "@/styles/style.module.css";
import { ChangeEvent, useEffect, useState } from "react";
import axios from "axios";
import Button from "@/components/Button";
import Card from "@/components/Card";

export default function Home() {
    const [search, setSearch] = useState("");
    const [data, setData] = useState([]);
    const [visibleItems, setVisibleItems] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
    };

    useEffect(() => {
        if (search.length > 2) {
            setIsLoading(true);
            axios
                .get(`https://images-api.nasa.gov/search?q=${search}`)
                .then((res) => {
                    setData(res.data.collection.items);
                    setVisibleItems(res.data.collection.items.slice(0, 4));
                    setIsLoading(false);
                })
                .catch((err) => {
                    console.log(err);
                    setIsLoading(false);
                });
        }
    }, [search]);

    function loadMoreItems() {
        setVisibleItems((prevVisibleItems) => [
            ...prevVisibleItems,
            ...data.slice(prevVisibleItems.length, prevVisibleItems.length + 4),
        ]);
    }

    return (
        <>
            <Head>
                <title>Nasa Search</title>
                <meta name="nasa-search" content="searcher for nasa API" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main>
                <div className={styles.container}>
                    <div>Nasa Image Search</div>
                    <input
                        type="text"
                        onChange={(e) => handleSearch(e)}
                        value={search}
                        className={styles.search}
                    />
                    <div className={styles.content}>
                        {isLoading ? (
                            <p>loading...</p>
                        ) : (
                            <>
                                {visibleItems.map((item, index) => (
                                    <Card
                                        key={index}
                                        index={index}
                                        title={item.data[0].title}
                                        center={item.data[0].center}
                                        date_created={item.data[0].date_created}
                                        link={
                                            item.links
                                                ? item.links[0].href
                                                : false
                                        }
                                    />
                                ))}
                                {visibleItems.length < data.length && (
                                    <Button onClick={loadMoreItems}>
                                        Load More
                                    </Button>
                                )}
                            </>
                        )}
                    </div>
                </div>
            </main>
        </>
    );
}
