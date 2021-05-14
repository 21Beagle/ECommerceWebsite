import React, { useState, useEffect} from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import SignUp from "./components/SignUp/SignUp"
import Login from "./components/Login/Login"
import Home from "./components/Home/Home"
import Header from "./components/Header/Header"
import Products from "./components/Products/Products"
import "./App.css"



export default function App(props) {

  const [products, setProducts] = useState([]);

  useEffect(() => 
  fetch('http://localhost:3001/products')
  .then(response => response.json())
  .then(data => setProducts(data)), [])


  return (
    <Router>
      <div>
        <Header />
        <Switch>
          <Route path="/signup">
            <SignUp />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/products">
            <Products products={products} />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}



