import React, {useState} from 'react'
import { Link } from "react-router-dom";
import Cookies from 'js-cookie';

import './Header.css'

function Header() {
    
    const [userLoggedOn, setUserLoggedOn] = useState(Cookies.get('loggedOn'));
    
    const handleChange = () =>{
        Cookies.remove('loggedOn')
        Cookies.remove('user')
        Cookies.remove('userId')
        setUserLoggedOn(false)
    }
    

    var signInLogOut;
    if (!userLoggedOn) {
        signInLogOut = <Link to="/signup">Sign Up</Link>;
    } else {
        signInLogOut = <Link to="/logout" onClick={handleChange}>Log Off</Link>;
    }

    var orders;
    if (!userLoggedOn) {
        orders = null
    } else {
        orders =
        <li className="listItems">
            <Link to="/orders">Your orders</Link>
        </li>
    }

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
                {orders}
                <li className="listItems">
                    {signInLogOut}
                </li>
            </ul>
        </div>
    )
}

export default Header

