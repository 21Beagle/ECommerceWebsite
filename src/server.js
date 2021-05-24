require('dotenv').config();
const { SERVERPORT } = require('./config');

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
    secret: process.env.SESSION_SECRET,
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
    user: process.env.PGUSER,
    host: process.env.PGHOST,
    database: process.env.PGDATABASE,
    password: process.env.PGPASSWORD,
    port: process.env.PGPORT,
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
    var userId = await findUserIdByEmail(userEmail)
    userId = userId.id
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
          res.cookie('userId', userId)
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

app.get('/cart/:cartId', async (req,res) => {
  try {
  const cartId = req.params.cartId
  const products = await getCartItems(cartId)
  res.json(products)
  } catch (e) {
      console.log(e)
      res.redirect('/')
  }
})

app.get('/products/:id', async (req,res) => {
  try {
    const id = req.params.id;
    result = await getProductById(id)
    res.json(result)
  } catch {
      res.redirect('/products/')
  }
})

app.get('/cart/:cartId/total', async (req, res) => {
  const cartId = req.params.cartId
  const userId = req.params.userId
  total = await getCartTotalByCartId(cartId, userId)
  total = total.sum
  res.send(total)
})

app.post('/cart/:id', async (req, res) => {
  try {
    const userId = req.body.userId
    const productId = req.params.id
    var userEmail = await findUserEmailById(userId)
    userEmail = userEmail.email[0]
    var cartId = await findCartIdByUserId(userId)
    var product = await getProductById(productId)
    product = product[0]
    const productName = product.name
    const productDescription = product.description
    const price = product.price
    if (!cartId) {
      console.log('cart created')
      createCart(userId)
      cartId = await findCartIdByUserId(userId)
      addToCart(productName, productDescription, userId, cartId, productId, price)
      res.cookie("cartId", cartId);
      res.redirect(`/cart`)
    } else {
      addToCart(productName, productDescription, userId, cartId, productId, price)
      console.log(`Added productId: ${productId} to userId: ${userId}'s cart`)
      res.cookie("cartId", cartId);
      res.redirect(`/products`)
    }
  } catch (e) {
    console.log(e)
    res.redirect(`/product/${req.params.id}`)
  }
})


app.post('/cart/:id/remove', async (req, res) => {
  try{
    const userId = req.body.userId
    const productId = req.body.productId
    const cartId = req.body.cartId
    console.log(req.body)
    removeFromCart(userId, productId, cartId)
    res.redirect('/cart')
  } catch (e) {
    console.log(e)
 }  

})


app.listen(SERVERPORT, ()=> {
    console.log(`The server has started on port ${SERVERPORT}`)
})



const createUser = async (userEmail, hashedPassword) => {
    await client.query(` 
            INSERT INTO public.users (email, password)
            VALUES ('{${userEmail}}', '{${hashedPassword}}');`)

}

const addToCart = async (productName, productDescription, userId, cartId, productId, price) => {
  try{ 
   await client.query(` 
   INSERT INTO public.cart_items (name, description, user_id, cart_id, product_id, price)
   VALUES ('${productName}', '${productDescription}', ${userId}, ${cartId}, ${productId}, ${price});`) 
  } catch (e) {
    console.log(e)
  }
}

const removeFromCart = async(userId, productId, cartId) => {
  await client.query(`
  DELETE FROM public.cart_items
	WHERE user_id = ${userId} AND product_id = ${productId} AND cart_id = ${cartId};
  `)
}

const findCartIdByUserId = async (userId) => {
  results = await client.query(` 
  SELECT id FROM public.cart
  WHERE user_id = ${userId};`)
  try {
    return results.rows[0].id
  } catch {
    return results.rows[0]
  }
}

const getCartTotalByCartId = async (cartId) => {
  results = await client.query(` 
  SELECT SUM(price) FROM public.cart_items
  WHERE cart_id = ${cartId};`)
  try {
    return results.rows[0]
  } catch {
    return results.rows[0]
  }
}

const createCart = async (id) => {
  await client.query(` 
          INSERT INTO public.cart (user_id)
          VALUES (${id});`)

}


const findUserByEmail = async (userEmail) => {
  results = await client.query(` 
  SELECT (email) FROM users
  WHERE email = '{${userEmail}}';`)
  return results.rows[0]
}

const findUserIdByEmail = async (userEmail) => {
  results = await client.query(` 
  SELECT (id) FROM users
  WHERE email = '{${userEmail}}';`)
  return results.rows[0]
}

const findUserEmailById = async (userId) => {
  results = await client.query(` 
  SELECT email FROM users
  WHERE id = ${userId};`)
  return results.rows[0]
}

const getUserDataByEmail = async (userEmail) => {
  results = await client.query(` 
  SELECT * FROM users
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

const getCartItems = async (cartId) => {
  results = await client.query(`SELECT * FROM cart_items
  WHERE cart_id = ${cartId};`)
  try{
    return results.rows
  } catch (e) {
    return null
  }
  
}

const getProductById = async (id) => {
  results = await client.query(`SELECT * FROM items WHERE id = ${id};`)
  return results.rows
}
