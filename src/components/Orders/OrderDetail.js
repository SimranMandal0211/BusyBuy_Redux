import styles from '../../styles/order.module.css';

export default function OrderDetail(props){
    const {date, list, amount} = props.order;

    return(
        <div className={styles.OrderDetailBox}>
            <h1>Ordered On: {date}</h1>

            <table>
                <thead>
                    <tr>
                        <th>S.no</th>
                        <th>Product Name</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Total Price</th>
                    </tr>
                </thead>
                <tbody>
                    {list.map((product, i) => 
                        <tr key={i}>
                            <td>{i + 1}</td>
                            <td className={styles.productNameData}>{product.name}</td>
                            <td>{product.price}</td>
                            <td>{product.quantity}</td>
                            <td>{product.quantity * product.price}</td>
                        </tr>
                    )}

                    <tr>
                        <td colSpan={4} className={styles.grandTotal}>Grand Total</td>
                        <td>Rs. {amount}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}