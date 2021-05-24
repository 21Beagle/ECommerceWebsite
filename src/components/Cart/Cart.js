import React, {useState, useEffect} from 'react'
import CartItem from '../CartItem/CartItem'
import './Cart.css'
import Cookies from 'js-cookie';


const Cart = () => {
    const [products, setProducts] = useState([]);
    console.log(Cookies.get('cartId'))
  

  useEffect(() => 
  fetch(`http://localhost:3001/cart/${Cookies.get('cartId')}`)
  .then(response => response.json())
  .then(data => setProducts(data)), [])


  const [total, setTotal] = useState([0]);
  

  useEffect(() => 
  fetch(`http://localhost:3001/cart/${Cookies.get('cartId')}/total`)
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
        </div>
    )
}

export default Cart
