const express = require("express");
const session = require('express-session');
const cookieParser = require("cookie-parser");

const app = express();
const bcrypt = require('bcrypt')
var cors = require('cors')
const { Client } = require('pg');
const db = require('./db');


var bodyParser = require("body-parser");
app.use(bodyParser.json())
app.use(cors())
app.use(
  session({  
    secret: "session_secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false,
      maxAge: 24 * 60 * 60 * 1000
    }
  })
);


app.use(cookieParser());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }))

const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'ecommerce',
    password: 'postgres',
    port: 5432,
  })

  client.connect()
  .then(()=> console.log("Connected to database successfully"))



app.post('/signup', async (req, res) => {
    try { 
        const userEmail = req.body.email
        const hashedPassword = await bcrypt.hash(req.body.password,10)
        const user = await findUserByEmail(userEmail)
        if (user === undefined) {
          createUser(userEmail, hashedPassword)
          res.redirect('/login')
        } else {
          console.log("UserAlready has an account")
          res.redirect('/login')
          
        }
        
    } catch {
        res.redirect('/register')
    }
 } )


 app.all('/logout',  (req, res) => {
   try {
    console.log(req)
    console.log("User logged out")
    res.clearCookie('user');
    res.cookie("loggedOn", false)
    res.redirect("/")
   } catch {
     res.redirect('/products')
   }
    
})



app.all('/login', async (req,res) => {
    try {
    const userEmail = req.body.email
    hashedPassword = await getUserHashedPassword(userEmail)
    bcrypt.compare(req.body.password, hashedPassword, function(err, isMatch) {
        if (err) {
          throw err
        } else if (!isMatch) {
          console.log("Password doesn't match!")
          res.redirect('/login')


        } else {
          console.log("Password matches!")
          res.cookie("user", userEmail);
          res.cookie("loggedOn", true)
          res.redirect("/products")
        }
      })
    } catch {
        res.redirect('/')
    }
})

app.get('/products', async (req,res) => {
  try {
  const products = await getProductItems()
  res.json(products)
  } catch {
      res.redirect('/')
  }
})

app.get('/products/:id', async (req,res) => {
  try {
    const id = req.params.id;
    result = await getProductById(id)
    console.log(result)
    res.json(result)
  } catch {
      res.redirect('/products/')
  }
})



app.listen(PORT = 3001, ()=> {
    console.log(`The server has started on port ${PORT}`)
})



const createUser = async (userEmail, hashedPassword) => {
    await client.query(` 
            INSERT INTO public.users (email, password)
            VALUES ('{${userEmail}}', '{${hashedPassword}}');`)

}

const findUserByEmail = async (userEmail) => {
  results = await client.query(` 
  SELECT (email) FROM users
  WHERE email = '{${userEmail}}';`)
  return results.rows[0]
}

const getUserHashedPassword = async (userEmail) => {
    console.log(userEmail)
    results = await client.query(`
        SELECT (password) FROM users
        WHERE email = '{${userEmail}}';
    `)
    return results.rows[0].password[0]
}

const getProductItems = async () => {
  results = await client.query(`SELECT * FROM items ORDER BY id ASC;`)
  return results.rows
}

const getProductById = async (id) => {
  results = await client.query(`SELECT * FROM items WHERE id = ${id};`)
  return results.rows
}
