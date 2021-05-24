import React, { useState, useEffect} from "react";
import './ProductPage.css'
import { useRouteMatch } from "react-router-dom";
import square from '../../media/images/square.jpg'
import Cookies from 'js-cookie';




function ProductPage() {
    let match = useRouteMatch("/product/:id");
    var [product, setProduct] = useState([""]);
  

    useEffect(() => 
    fetch(`http://localhost:3001/products/${match.params.id}`)
    .then(response => response.json())
    .then(data => setProduct(data)), [match.params.id])
    
    
    product=product[0]


    return (
        <div className="pageContainer center vContainer">
            <div className="hContainer center" >
                <div className="split">
                    <img className="center" src={square} width="300" height="auto" alt="square"></img>
                </div>
                <div className="vContainer center">
                    <h1 className="productPageTitle">{product.name} </h1>
                    <p className="productPageDesc">{product.description}</p>
                    <p className="productPagePrice">Price: {product.price} </p>
                    <div className="addToCart hContainer">
                        <p>Add to cart  </p> 
                        <form action={`/cart/${product.id}`} method="POST">
                            <input type="hidden" name="userId" value={Cookies.get('userId')} id='userId' />
                            <button type="submit" name="addToCart" className="cartButton">Add to cart </button>   
                        </form>
                    
                    </div>
                </div>
            </div>    
        </div>
        
    )
}

export default ProductPage
