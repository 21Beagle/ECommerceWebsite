import React from 'react'
import "./SignUp.css"

function SignUp() {
  return (
    <div className="signUp center">
      <form action="action_page.php">

      <div class="vcontainer">
        <h1 id="signUpBright">Register</h1>
        <p id="signUpBright">Please fill in this form to create an account.</p>
        <hr id="signUpHr"/>

        <div className="hcontainer ">
          <label for="email" id="signUpDark"><b>Email:</b></label>
          <input type="text" placeholder="Enter Email" name="email" id="email" required />          
        </div>

        <div className="hcontainer ">
          <label for="psw" className="item" id="signUpDark"><b>Password:</b></label>
          <input type="password" placeholder="Enter Password" name="psw" id="psw" required />
        </div>
          <button type="submit" class="registerbtn" id="signUpButton">Register </button>  
      </div>
      <hr id="signUpHr"/>
      <p id="signUpBright">Already have an account? <a href="login"> Sign in </a>.</p>
    </form>
    </div>
    )
}

export default SignUp
