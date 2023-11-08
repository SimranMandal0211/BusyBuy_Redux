import ItemCard from './ItemCard';

import styles from '../../styles/home.module.css';

import { useProductContext } from '../../productContext';

function MainContent(props){
    // product data
    const { data } = useProductContext();
    const { search, price, category } = props

    console.log('search: ',search);
    return(
        <div className={styles.itemContainer}>
            {data
                // filter on the basis of search bar
                .filter((item) => {
                    return search.toLocaleLowerCase() === ''
                    ? item : item.name.toLocaleLowerCase().includes(search)
                })
                // filter on the basis of price range
                .filter((item) => {
                    return price === 0 || item.price <= price
                })
                // filter on the basis of category
                .filter((item) => {
                    return category === 'none' || item.category === category
                })
                // map to each item of the array
                .map((item) => 
                    <ItemCard  key={item.id}
                        item={item}
                    />
                )
            }
        </div>   
    )
}

export default MainContent;