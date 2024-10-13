const express= require("express");
const {userauth}=require("../middlewares/auth.js");
const profilerouter=express.Router();
profilerouter.get("/profile",userauth,async(req,res)=>{
    try{
    const user= req.user;
    if(!user){
        throw new Error("User Does not  Exist")
    }
        res.send(user);

    }catch(err){
        throw new Error("Error: "+err.message);
    }
})
module.exports=profilerouter;