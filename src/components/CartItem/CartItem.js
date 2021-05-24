import React from 'react'
import './CartItem.css'
import square from '../../media/images/square.jpg'
import Cookies from 'js-cookie';

function CartItem(props) {
    return (
        <div className="hContainerCart cartList center">
            <div className="vContainerCart">
                <img className="center cartImage" src={square} width="300" height="auto" alt="square"></img>
            </div>
            <div className="vContainerCartName">
                <h2 className="itemCart">{props.products.name}</h2>
                <p className="itemCart description">{props.products.description}</p>   
            </div>
            <div className="vContainerCart">
                <h3 className="itemCart">Price: {props.products.price}</h3> 
                <form action={`/cart/${props.products.id}/remove`} method="POST">
                            <input type="hidden" name="userId" value={Cookies.get('userId')} id='userId' />
                            <input type="hidden" name="productId" value={props.products.product_id} id='productId' />                            <input type="hidden" name="cartId" value={Cookies.get('cartId')} id='cartId' />
                            <button type="submit" className="cartButton">Remove from cart</button>   
                </form>
            </div>
            
        </div>
    )
}

export default CartItem
