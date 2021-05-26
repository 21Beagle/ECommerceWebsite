import React, {useState, useEffect} from 'react'
import OrderItem from '../OrderItem/OrderItem'
import Cookies from 'js-cookie';


const Orders = () => {
    const [orders, setOrders] = useState([]);
    const userId = Cookies.get('userId')

    useEffect(() => 
    fetch(`http://localhost:3001/orders/${userId}`)
    .then(response => response.json())
    .then(data => setOrders(data)), [userId])
    return (
        <div className="ordersFeed center">
        <h2 className="title">Your Orders</h2>
        <div className="ordersContainer center">
        {
                     (orders != null) ? orders.map((order, index) => { 
                     return <OrderItem key={index} orders={order} />}) : ''
                 } 
        </div>
        
      </div>
    )
}

export default Orders
