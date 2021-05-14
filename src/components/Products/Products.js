import React from 'react'
import Item from "../Item/Item"
import "./Products.css"


function Products(props) {
  
    return (
      <div className="productsFeed center">
        <h2 className="title">Products</h2>
        <div className="productsContainer center">
        {
                     (props.products != null) ? props.products.map((product, index) => { 
                     return <Item key={index} products={product} />}) : ''
                 } 
        </div>
        
      </div>
    );
  }
  

  export default Products