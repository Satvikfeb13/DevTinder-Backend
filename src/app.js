const express= require("express");
const connectDB=require("./Config/database.js")
const app=express();
const User=require("./models/user.js");
app.use(express.json());
app.post("/signup",async(req,res)=>{
    const user= new User(req.body);
    try{
        await user.save();
        res.send("user added successfully");
    }catch(err){
        res.status(400).send("Error saving the user:"+err.message);
    }
})
app.get("/user",async(req,res)=>{
    const userEmail=req.body.emailId;
    const user= await User.find({emailId:userEmail});
    try{
        if(user===0){
            res.status(404).send("user not found");
        }else{
            res.send(user);
        }
    }catch(err){

        res.status(400).send("Something went wrong ");
    }
})
app.get("/feed",async(req,res)=>{
    const userEmail=req.body.emailId;
    const users=await User.findOne({emailId:userEmail});
    try{
        if(users===0){
            res.status(401).send("Invalid user");
        }else{
            res.send(user);
        }
    }catch{
        res.status(400).send("Something went wrong ");
   
    }

})
connectDB()
.then(()=>{
    console.log("Database connect successfully ");
    app.listen(3000,()=>{
        console.log("server will be successfully exected on  port 7777");
    }); 
}).catch((err)=>{
    console.log("Database can not connected ");
})

