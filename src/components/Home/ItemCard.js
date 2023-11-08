import { useProductContext } from '../../productContext';
import styles from '../../styles/home.module.css';

function ItemCard(props){
    // getting all the value of product from props
    const {name, image, price, category} = props.item;

    // function to add item to cart
    const {addToCart} = useProductContext();

    return(
       <div className={styles.cardContainer}>
            <div className={styles.imgBox}>
                <img src={image} alt={category} 
                    className={styles.productImg}
                />
            </div>

            <div className={styles.itemDetailBox}>
                <p>{name}</p>
                <p>Rs. {price}</p>
            </div>

            <button onClick={() => addToCart(props.item)}>Add To Cart</button>
       </div>
    )
}

export default ItemCard;