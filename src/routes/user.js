const express=require("express");
const userrouter=express.Router();
const {userauth}=require("../middlewares//auth");
userrouter.get("/",userauth, async(req,res)=>{

})