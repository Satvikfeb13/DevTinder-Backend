const express= require("express");
const bcrypt=require("bcrypt")
const validation=require("validator");
// const user=require("../models/user.js")
const User = require("../models/user"); 

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
profilerouter.patch("/profile/password",userauth,async(req,res)=>{
    try{
        const{emailId,password}=req.body;
        if(password.length<8){
            throw new Error("Password is not less than 8 characters ");            
        }
        if(!validation.isStrongPassword(password)){
            throw new Error("Please Enter a Strong password ");
        }
        const hashedpassword=await bcrypt.hash(password,10);
        const user=await User.findOne({emailId:emailId});
        if (!user) {
          throw new Error("User not found");
        }
        // Update the password
        user.password = hashedpassword;
        // Save the updated user document
        await user.save();
        res.send("Password will be updated successfully");   
    }catch(err){
        res.status(400).send("err: "+err.message);
    }
})
module.exports=profilerouter;