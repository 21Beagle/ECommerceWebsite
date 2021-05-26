import React, {useState, useEffect} from 'react'
import { useRouteMatch } from "react-router-dom";
import OrderItem from '../OrderItem/OrderItem'
import Cookies from 'js-cookie';



const OrderPage = (props) => {
    const [products, setProducts] = useState([]);

    const cartId = Cookies.get('cartId')
    const userId = Cookies.get('userId')

    let match = useRouteMatch(`/order/${userId}/:id`);

    useEffect(() => 
    fetch(`http://localhost:3001/order/${userId}/${match.params.id}`)
    .then(response => response.json())
    .then(data => setProducts(data)), [cartId])

    const [total, setTotal] = useState(0);
    console.log(products)


    return (
        <div className='center cartListContainer'>
            <h1>Your Order</h1>
            {
                     (products != null) ? products.map((product, index) => { 
                     return <OrderItem key={index} products={product} />}) : ''
                 }   
        </div>
    )
}

export default OrderPage
