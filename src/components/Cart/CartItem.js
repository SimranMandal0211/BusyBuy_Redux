import minusIcon from '../../assets/images/remove.png';
import plusIcon from '../../assets/images/add.png';

import styles from '../../styles/cart.module.css';
import { useProductContext } from '../../productContext';

export default function CartItem(props){
    const {name, image, price, category, quantity} = props.product;
    const {removeFromCart, increaseQty, decreaseQty} = useProductContext();

    return(
        <div className={styles.cartItem}>
            <div className={styles.cartItemImgBox}>
                <div className={styles.cartItemImg}>
                    <img src={image} alt={category} />
                </div>
                <div className={styles.qtyBtns}>
                    <span onClick={() => decreaseQty(props.product)}><img src={minusIcon} alt='-' /></span>
                    <span>{quantity}</span>
                    <span onClick={() => increaseQty(props.product)}><img src={plusIcon} alt='+' /></span>
                </div>
            </div>

            <div className={styles.cartItemDetails}>
                <p>{name}</p>
                <p>Rs. {price}</p>

                <button onClick={() => removeFromCart(props.product)}>Remove From Cart</button>
            </div>

        </div>
    );
}