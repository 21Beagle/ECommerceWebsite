import React, {useState, useEffect} from 'react'
import CartItem from '../CartItem/CartItem'
import './Cart.css'
import Cookies from 'js-cookie';


const Cart = () => {
    const [products, setProducts] = useState([]);
    const cartId = Cookies.get('cartId')
    const userId = Cookies.get('userId')

  useEffect(() => 
  fetch(`http://localhost:3001/cart/${cartId}`)
  .then(response => response.json())
  .then(data => setProducts(data)), [cartId])


  const [total, setTotal] = useState([0]);
  

  useEffect(() => 
  fetch(`http://localhost:3001/cart/${cartId}/total`)
  .then(response => response.json())
  .then(data => setTotal(data)), [])

    console.log(products)
    return (
        <div className='center cartListContainer'>
            <h1>Cart</h1>
            {
                     (products != null) ? products.map((product, index) => { 
                     return <CartItem key={index} products={product} />}) : ''
                 }    
            <p className="total">Total: {total}</p>
            <form action={`/orders/complete/${cartId}`} method="POST">
                <input type="hidden" name="total" value={total} id='total' />
                <input type="hidden" name="userId" value={userId} id='userId' />
                <button type="submit" className="cartComplete center">Complete Order</button>   
            </form>
        </div>
    )
}

export default Cart
