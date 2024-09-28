const express= require("express");
const connectDB=require("./Config/database.js")
const app=express();
connectDB()
.then(()=>{
    console.log("Database connect successfully ");
    app.listen(3000,()=>{
        console.log("server will be successfully exected on  port 7777");
    }); 
}).catch((err)=>{
    console.log("Database can not connected ");
})

