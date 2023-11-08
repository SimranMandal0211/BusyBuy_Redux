import minusIcon from '../../assets/images/remove.png';
import plusIcon from '../../assets/images/add.png';

// to call reducer actions 
import { useDispatch } from "react-redux";
// thunk actions from Product Reducer
import {removeFromCartThunk,increaseQuantThunk,decreaseQuantThunk} from "../../Redux/Reducers/productReducer";


import styles from '../../styles/cart.module.css';

export default function CartItem(props){
    // for calling actions
    const dispatch = useDispatch();

    const {name, image, price, category, quantity} = props.product;


    return(
        <div className={styles.cartItem}>
            <div className={styles.cartItemImgBox}>
                <div className={styles.cartItemImg}>
                    <img src={image} alt={category} />
                </div>
                <div className={styles.qtyBtns}>
                    <span onClick={() => dispatch(decreaseQuantThunk(props.product)) }><img src={minusIcon} alt='-' /></span>
                    <span>{quantity}</span>
                    <span onClick={() => dispatch(increaseQuantThunk(props.product))}><img src={plusIcon} alt='+' /></span>
                </div>
            </div>

            <div className={styles.cartItemDetails}>
                <p>{name}</p>
                <p>Rs. {price}</p>

                <button onClick={() =>dispatch(removeFromCartThunk(props.product))}>Remove From Cart</button>
            </div>

        </div>
    );
}