import React from 'react'
import square from '../../media/images/square.jpg'
import "./Item.css"


function Item(props) {
    return (
            <div className="productItem center" >
                <img className="center" src={square} width="300" height="300" alt="square"></img>
                <h3 className="itemName">{props.products.id}. {props.products.name}</h3>
                <p className="itemDescription">{props.products.description}</p>
                <p className='price'>{props.products.price}</p>
            </div>
    )
}

export default Item
