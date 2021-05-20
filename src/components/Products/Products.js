import React, { useState, useEffect} from "react";
import Item from "../Item/Item"
import "./Products.css"


function Products(props) {
  const [products, setProducts] = useState([]);
  

  useEffect(() => 
  fetch('http://localhost:3001/products')
  .then(response => response.json())
  .then(data => setProducts(data)), [])


  
    return (
      <div className="productsFeed center">
        <h2 className="title">Products</h2>
        <div className="productsContainer center">
        {
                     (products != null) ? products.map((product, index) => { 
                     return <Item key={index} products={product} />}) : ''
                 } 
        </div>
        
      </div>
    );
  }
  

  export default Products