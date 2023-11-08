import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";

import CartItem from '../components/Cart/CartItem';
import Loader from '../components/Loader';

import styles from '../styles/cart.module.css';

// for toast notification
import { toast } from "react-toastify";
// react router
import { useNavigate } from 'react-router-dom';

// actions from Auth and Product Reducers
import { authSelector } from "../Redux/Reducers/authReducer";
import { productSelector, purchaseAllThunk } from "../Redux/Reducers/productReducer";


export default function Cart(){
    const dispatch = useDispatch();

    const [isLoading,setLoading]=useState(true);

    // use in navigate to another page
    const navigate = useNavigate();

    // data of user from Auth Reducer
    const {userLoggedIn}=useSelector(authSelector);

    // data of cart items from Product Reducer
    const {cart,total,itemInCart} = useSelector(productSelector);
     
    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 300);
    }, []);



    // purchase button handler
    function handlePurchase(){
        // cart empty
        if(itemInCart === 0){
            toast.error('Nothing to purchase in Cart!!');
            return;
        }

        // purchase function
        dispatch(purchaseAllThunk());
        toast.success('Your Order has been Placed!!!');

        navigate('/order');
    }

    return(
        <>
        {isLoading ? <Loader /> : 
            <div className={styles.cartPageBox}>
                <div className={styles.cartItemsBox}>
                    {cart.length === 0 ? 
                        <h1>Nothing in 
                            {userLoggedIn.name}
                             your Cart!!!</h1> :
                        cart.map((product, i) => 
                                    <CartItem key={i} 
                                        product={product} />
                                )
                    }
                </div>
                <div className={styles.cartPurchaseSection}>
                    <h3>PRICE DETAIL</h3>
                    <table className={styles.buyItemList}>
                        <tbody>
                            {cart.map((product, i) => (
                                <tr key={i}>
                                    <td>{product.name}</td>
                                    <td className={styles.productPrice}>Rs. {product.price * product.quantity}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <p className={styles.totalAmount}> Total Amount:  Rs.{total}</p>
                    <button onClick={handlePurchase} className={styles.placeOrder}>PLACE ORDER</button>
                </div>
            </div>
        }
        </>
    );
}