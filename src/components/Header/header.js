import React from 'react'
import { Link } from "react-router-dom";

import './Header.css'

function Header() {
    return (
        <div className="headerBar">
            <ul className="headerContainer">
                <li className="listItems">
                    <Link to="/">Home</Link>
                </li>
                <li className="listItems">
                    <Link to="/products">Products</Link>
                </li>
                <li className="listItems">
                    <Link to="/cart">Cart</Link>
                </li>
                <li className="listItems">
                    <Link to="/signup">Sign Up</Link>
                </li>
            </ul>
        </div>
    )
}

export default Header

