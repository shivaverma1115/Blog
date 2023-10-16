const express = require('express') ;
const signupRoute = express.Router() ;
require('dotenv').config() ;
const bcrypt = require('bcrypt') ;

const {signupModel} = require('../models/signup.model') ;
signupRoute.post('/',async(req,res)=>{
    const {email,password,name} = req.body
    const isUser = await signupModel.findOne({email}) ;
    if(isUser){
        return res.send({msg:"Your email already used.Try Login!"}) ;
    }
    bcrypt.hash(password,2,async(err,hash)=>{
        if(err){
            return res.status(500).send({msg:"Try again letter"})
        }
        const newUser = new signupModel({
            email,
            password:hash,
            name
        })
        await newUser.save() ;
        return res.status(200).send({msg:"You are successful signup"}) ;
    })
})

module.exports={
    signupRoute
}