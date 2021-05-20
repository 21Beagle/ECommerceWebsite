import React from "react";
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
import ProductPage from './components/ProductPage/ProductPage'


import "./App.css"



export default function App(props) {
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
            <Products  />
          </Route>
          <Route path="/product/:id">
            <ProductPage  />
          </Route>
          <Route path="/">
            <Home  />
          </Route>
          <Route path="/logout">
            <Home  />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}



