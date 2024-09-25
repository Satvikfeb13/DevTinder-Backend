const express= require("express");
const app=express();
app.use("/user",(req,res,next)=>{
    next();
    // res.send("Response");
},(req,res,next)=>{
    // res.send(" 2nd Response ");
    next();
    console.log("helpr");    
},(req,res,next)=>{
    // res.send(" 3rd Response ");
    next();
    console.log("helpr");    
},(req,res,next)=>{
    // res.send(" 4th Response ");
    next();
    console.log("helpr");    
},(req,res,next)=>{
    // res.send(" 5th Response ");
    next();
    console.log("helpr");    
}







)
app.listen(3000,()=>{
    console.log("server will be successfully exected on  port 7777");
}); 