const express=require("express");
const User = require("../models/user.js")
const {userauth}=require("../middlewares/auth.js");
const requestrouter=express.Router();
requestrouter.post("/sendconnectionrequest",userauth,(req,res)=>{
    const user=req.user;
    res.send(user.firstName +" is send connection request")
})
module.exports=requestrouter;