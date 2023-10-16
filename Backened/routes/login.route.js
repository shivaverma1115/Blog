const express = require('express') ;

const loginRouter = express.Router() ;
const bcrypt = require("bcrypt") ;
require('dotenv').config() ;
const jwt = require('jsonwebtoken') ;

const {signupModel} = require('../models/signup.model') ;
loginRouter.post('/',async(req,res)=>{
    const {email,password} = req.body ;
    const isUser = await signupModel.findOne({email}) ;
    if( !isUser ){
        return res.send({msg:'Your email not exists. Try Signup'}) ;
    }
    bcrypt.compare(password,isUser.password,(err,result)=>{
        if( err ){
            return res.send({msg:"try again letter"})
        }
        if( result ){
            const token = jwt.sign({userId:isUser._id},process.env.SECRET_KEY) ;
            return res.status(200).send({
                msg:"Login Successful",
                token:token
            })
        }
    })
})

module.exports={
    loginRouter
}