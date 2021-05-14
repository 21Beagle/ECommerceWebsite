module.exports = (app, createUser) => {

    app.use('/auth', router);
  
    // Registration Endpoint
    app.post('/signup', async (req, res) => {
        try { 
            const userEmail = req.body.email
            const hashedPassword = await bcrypt.hash(req.body.password,10)
            createUser(userEmail, hashedPassword)
            res.redirect('/login')
        } catch {
            res.redirect('/register')
        }
    })
    
    
    const createUser = async (userEmail, hashedPassword) => {
        await client.query(` 
                INSERT INTO public.users (email, password)
                VALUES ('{${userEmail}}', '{${hashedPassword}}');`)
    
    }
    



}