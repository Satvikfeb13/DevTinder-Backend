const express=require("express");
const Authrouter=express.Router();
const {validateSignUpdata}=require("../Utils/validation.js")
const bcrypt=require("bcrypt");  
const User = require("../models/user.js");
Authrouter.post("/signup",async(req,res)=>{
    // validation of the data 4
    try{
        validateSignUpdata(req);
    const{firstName,lastName,emailId,password}=req.body;

    // Encrypt password
    const passwordHash= await bcrypt.hash(password,10);


    // store the user to the database
    const user= new User({
        firstName,lastName,emailId,password:passwordHash
    });

        await user.save();
        res.send("user added successfully");
    }catch(err){
        res.status(400).send("Error :"+err.message);
    }
})

Authrouter.post("/login",async(req,res)=>{
    try{
        const{emailId,password}=req.body;
        const user=await User.findOne({emailId:emailId});
        if(!user){
            throw new Error("Invalid credential");
        }
        const ispasswordvalid=await user.ispasswordvalid(password);    
        if(ispasswordvalid){
            // create a jwt token
            const token= await user.getJWT();   
            res.cookie("token",token,{
                expire: new Date(Date.now()+8*3600000)
            })
            res.send("Login succcessfully")
        }else{
            throw new Error("Invalid credential");
        }

    }catch(err){
        res.status(400).send("Error: "+err.message)
    }
})
Authrouter.post("/signout",async(req,res)=>{
    
})
module.exports=Authrouter; 
