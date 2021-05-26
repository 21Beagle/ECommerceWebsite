import React from 'react'
import './OrderItem.css'
import square from '../../media/images/square.jpg'


const OrderItem = (props) => {


    
    return (
        <div className="hContainerCart cartList center">
            <div className="vContainerCart">
                <img className="center orderImage" src={square} width="100" height="auto" alt="square"></img>
            </div>
            <div className="vContainerCartName">
                <h2 className="itemCart">Product: {props.products.name}</h2>  
            </div>
            <div className="vContainerCart">
                <h3 className="itemCart">Price: {props.products.price}</h3> 
            </div>
        </div>
    )
}

export default OrderItem


