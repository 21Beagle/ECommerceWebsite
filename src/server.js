const express = require("express");
const app = express();
const bcrypt = require('bcrypt')
const { Client } = require('pg');
const db = require('./db');



var bodyParser = require("body-parser");
app.use(bodyParser.json())


const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'ecommerce',
    password: 'postgres',
    port: 5432,
  })

  client.connect()
  .then(()=> console.log("Connected successfully"))



app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }))

app.post('/signup', async (req, res) => {
    try { 
        const userEmail = req.body.email
        const hashedPassword = await bcrypt.hash(req.body.password,10)
        createUser(userEmail, hashedPassword)
        res.redirect('/login')
    } catch {
        res.redirect('/register')
    }
 } )

app.post('/login', async (req,res) => {
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
          res.redirect('/')
        }
      })
    } catch {
        res.redirect('/')
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

const getUserHashedPassword = async (userEmail) => {
    console.log(userEmail)
    results = await client.query(`
        SELECT (password) FROM users
        WHERE email = '{${userEmail}}';
    `)
    return results.rows[0].password[0]
}

