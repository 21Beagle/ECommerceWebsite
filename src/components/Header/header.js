import React, {useState} from 'react'
import { Link } from "react-router-dom";
import Cookies from 'js-cookie';

import './Header.css'

function Header() {
    
    const [userLoggedOn, setUserLoggedOn] = useState(Cookies.get('loggedOn'));
    
    const handleChange = () =>{
        Cookies.remove('loggedOn')
        Cookies.remove('user')
        setUserLoggedOn(false)
    }
    

    var button;
    if (!userLoggedOn) {
      button = <Link to="/signup">Sign Up</Link>;
    } else {
      button = <Link to="/logout" onClick={handleChange}>Log Off</Link>;
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
                <li className="listItems">
                    {button}
                </li>
            </ul>
        </div>
    )
}

export default Header

