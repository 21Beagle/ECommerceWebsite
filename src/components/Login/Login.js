import React from 'react'
import "./Login.css"

function Login() {
  return (
    <div className="logIn center">
      <form action="/login" method="POST">

      <div class="vcontainer">
        <h1>Log in</h1>
        <p>Please fill in this form to log into your account.</p>
        <hr />

        <div className="hcontainer ">
          <label for="email"><b>Email:</b></label>
          <input type="text" placeholder="Enter Email" name="email" id="email" required />          
        </div>

        <div className="hcontainer ">
          <label for="psw" className="item"><b>Password:</b></label>
          <input type="password" placeholder="Enter Password" name="password" id="password" required />
        </div>
          <button type="submit" class="registerbtn">Login </button>  
      </div>
      <hr />
      <p>Don't have an account? <a href="signup"> Sign up </a>.</p>
    </form>
    </div>
    )
}

export default Login
