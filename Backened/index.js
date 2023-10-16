const express = require('express') ;
const{connection} = require('./config/db') ;
const bodyPareser = require('body-parser') ;
require('dotenv').config() ;
const app = express() ;
app.use(bodyPareser.urlencoded({extended:false}))
app.use(bodyPareser.json())
app.use(express.json()) ;

app.get('/',(req,res)=>{
    res.send({msg:"this is api base point"}) ;
})

const {signupRoute} = require('./routes/signup.route') ;
app.use('/signup',signupRoute) ;

const {loginRouter} = require('./routes/login.route') ;
app.use('/login',loginRouter) ;

const {blogRouter} = require('./routes/blog.route') ;
app.use('/blog',blogRouter) ;

const {cloudinaryRouter} = require('./routes/cloudinary') ;
app.use('/cloudinary',cloudinaryRouter) ;

const port = process.env.PORT ;
app.listen(port,async()=>{
    try {
        await connection
        console.log('db is connected') ;
    } catch (error) {
        console.log(error) ;
        console.log('db is not connected') ;
    }
    console.log(`Our app is listening at ${port}`) ;
})