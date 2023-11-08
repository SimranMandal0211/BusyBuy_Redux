import { useEffect, useState } from "react";
import MainContent from "../components/Home/MainContent";
import FilterBar from '../components/Home/FilterBar';
import Loader from '../components/Loader';

import styles from '../styles/home.module.css';

function Home(){
    const [search, setSearch] = useState('');
    const [price, setPrice] = useState(5000);
    const [category, setCategory] = useState('none');

    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 600);
    }, []);


    return(
        <>
            {isLoading ? <Loader /> :
            <div className={styles.homeContainer}>
                <div className={styles.searchInputBox}>
                    <input type='text' placeholder='Search Item...'
                        value={search} 
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
                <div className={styles.filterMainContainer}>
                    <FilterBar price={price}
                        setPrice={setPrice}
                        setCategory={setCategory}
                    />
                    <MainContent search={search} 
                        price={price}
                        category={category}
                    />
                </div>
            </div>
            }
        </>
    )
}

export default Home;