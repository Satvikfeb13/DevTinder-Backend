const express= require("express");
const connectDB=require("./Config/database.js")
const app=express();
const User=require("./models/user.js");
const {validateSiguUpdata}=require("./Utils/validation.js")
const bcrypt=require("bcrypt");  
app.use(express.json());
app.post("/signup",async(req,res)=>{
    // validation of the data 4
    try{
    validateSiguUpdata(req);
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
app.post("/login",async(req,res)=>{
    try{
        const {emailId,password}=req.body;
        const user=await User.findOne({emailId:emailId});
        if(!user){
            throw new Error("Invalid Credential");
        }
        const ispasswordvalid=await bcrypt.compare(password,user.password);
        if(ispasswordvalid){
            res.cookie("token","ashdjhahsdjhsajdhjhsadhjshmynameiasarssatviksatvvik")
            res.send("Login successfully")
        }else{
            throw new Error("Invalid Credential ")
        }


    }catch(err){
        res.status(400).send("Error :"+err.message);
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
// get element by id     
app.get("/byid",async(req,res)=>{
    const userId=req.body.userId;
    const user=await User.findById({_id:userId});
    try{
        if(!user){
            res.status(401).send("user not found");
        }else{
            res.send(user);
        }
    }catch{
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
        res.status(500).send("Something went wrong ");
   
    }

})
// delete user from database
app.delete("/user",async(req,res)=>{
    const userId=req.body.userId;
    const user= await User.findByIdAndDelete({_id:userId});
    try{
        res.send("user deleted successfully");
    }catch(err){
        res.status(400).send("something went wrong");
    }
})
// update user 
app.patch("/user-update/:userId",async(req,res)=>{
    const userId=req.params?.userId;
    const data=req.body;
    try{
        const ALLOWED_UPDATE=["skills","age","gender","about","photourl"];
        const isupdateallowed=Object.keys(data).every((k)=>ALLOWED_UPDATE.includes(k));
        if(!isupdateallowed){
            throw new Error("Update not allowed");
        }
        if(data?.skills.length>10) {
            throw new Error("Skills cannot be more than 10")    
        }
        await User.findByIdAndUpdate({_id:userId},data,{
            returnDocument:"after",
            runValidators:true ,
        })
        res.send("User updated successfully");
    }catch(err){
        res.status(400).send("Update Failed"+err.message);
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

