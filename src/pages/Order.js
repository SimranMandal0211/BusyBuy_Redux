import OrderDetail from '../components/Orders/OrderDetail';
import Loader from '../components/Loader';

import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

import { useProductContext } from '../productContext';
import styles from '../styles/order.module.css';

export default function Order(){
    const { myorders } = useProductContext();

    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 300);
    }, []);
    
    

    return(
        <>
            {isLoading ? <Loader /> :
                <div className={styles.orderContainer}>
                    <h1>My Order</h1>

                    {myorders.length === 0 ? 
                        <>
                        <h1>You haven't placed any order yet!!</h1>
                        <Link to='/' className={styles.shopingMsg}>!!! Start Shopping !!!</Link>
                        </>
                        :
                        // order list container
                        <div className={styles.orderListContainer}>
                            {myorders.map((order, i) => <OrderDetail key={i} 
                                order={order}
                            />)}
                        </div>
                    }
                </div>
            }
        </>
    )
}