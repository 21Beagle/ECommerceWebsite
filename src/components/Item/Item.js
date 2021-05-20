import React from 'react'
import square from '../../media/images/square.jpg'
import "./Item.css"
import { Link } from "react-router-dom";


function Item(props) {

    return (
        <div className="productsItem center" >
            <Link to={`/product/${props.products.id}`} product={props.products} >
                <img className="center" src={square} width="300" height="auto" alt="square"></img>
                <h3 className="itemName">{props.products.id}. {props.products.name}</h3>
                <p className="itemDescription">{props.products.description}</p>
                <p className='price'>Price: {props.products.price}</p> </Link>
        </div>
    )
}

export default Item
