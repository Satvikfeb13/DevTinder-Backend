const express= require("express");
const app=express();
app.get("/user",(req,res)=>{
    res.send({firstname:"Satvik",lastname:"Patil"})
})
app.post("/user",(req,res)=>{
    res.send("Data will successfully  save to the database")
})
app.delete("/user",(req,res)=>{
    res.send("Data will be successfully deleted ");
})
app.listen(3000,()=>{
    console.log("server will be successfully exected on  port 7777");
}); 