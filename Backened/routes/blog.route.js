const express = require('express') ;
const blogRouter = express.Router() ;

const {blogModel} = require('../models/blog.model') ;

blogRouter.get('/',async(req,res)=>{
    const {title} = req.params ;
    let query = {} ;
    if( title ){
        query.Title={$regex:title,$option:'i'}
    }
    const AllBlogs = await blogModel.find(query) ;
    return res.status(200).send(AllBlogs) ;
})

blogRouter.post('/',async(req,res)=>{
    const {Title,Image,Description} = req.body ;
    const newBlog = new blogModel({
        Title,
        Image,
        Description
    })
    await newBlog.save() ;
    return res.status(200).send({msg:"Posted Successful"}) ;
})

module.exports={
    blogRouter
}