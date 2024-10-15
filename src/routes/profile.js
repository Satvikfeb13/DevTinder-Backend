const express= require("express");
const user=require("../models/user.js")
const {userauth}=require("../middlewares/auth.js");
const {validateEditProfileData}=require("../Utils/validation.js")
const profilerouter=express.Router();
profilerouter.get("/profile/view",userauth,async(req,res)=>{
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
profilerouter.patch("/profile/edit",userauth,async(req,res)=>{
    try{
        if(!validateEditProfileData(req)){
        throw new Error("Invalid edit request");
        }
        const loggedinuser=req.user;
        Object.keys(req.body).forEach(key=>loggedinuser[key]=req.body[key]);
        await loggedinuser.save();
        res.send(`${loggedinuser.firstName} your profile updated successully`)
    }catch(err){
        res.status(400).send("Err: "+err.message)
    }
})
module.exports=profilerouter;