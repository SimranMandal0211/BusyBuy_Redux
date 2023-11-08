import { useEffect, useState } from 'react';

import {useProductContext} from '../productContext';

import CartItem from '../components/Cart/CartItem';
import Loader from '../components/Loader';

import styles from '../styles/cart.module.css';

// for toast notification
import { toast } from "react-toastify";
// react router
import { useNavigate } from 'react-router-dom';


export default function Cart(){
    const {cart, total, itemInCart, purchaseAll} = useProductContext();

    const [isLoading,setLoading]=useState(true);

    // use in navigate to another page
    const navigate = useNavigate();

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

        // define in productContext
        purchaseAll();
        toast.success('Your Order has been Placed!!!');

        navigate('/order');
    }

    return(
        <>
        {isLoading ? <Loader /> : 
            <div className={styles.cartPageBox}>
                <div className={styles.cartItemsBox}>
                    {cart.length === 0 ? 
                        <h1>Nothing in your Cart!!!</h1> :
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