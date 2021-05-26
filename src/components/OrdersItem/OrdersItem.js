import React from 'react'
import './OrdersItem.css'
import { Link } from "react-router-dom";


const OrderItems = (props) => {
    var orderStatus
    if (props.orders.status === 0) {
        orderStatus = 'Ordered'
    }

    return (
        <div>
            <Link to={`/order/${props.orders.user_id}/${props.orders.id}`} order={props.orders} >
                <div className="hContainerOrders center orderList">
                    <h3 className='orderTitle orderItem'>Order ID: {props.orders.id} </h3>
                    <p className='status orderItem'>Status: {orderStatus}</p>
                    <p className='price orderItem'> Total: {props.orders.total}</p>
                </div>
            </Link>
            
        </div>
    )
}

export default OrderItems
