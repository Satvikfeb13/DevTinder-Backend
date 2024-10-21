const express=require("express");
const userrouter=express.Router();
const {userauth}=require("../middlewares//auth");
const ConnectionRequest = require("../models/connectionrequest");
// const User=require("../models/user")
// get all the peding connection requests for hte logged in user
userrouter.get("/user/requests/received",userauth, async(req,res)=>{
try{
    const loggedInUser= req.user;
    const connectionRequest= await ConnectionRequest.find({
        toUserId:loggedInUser._id ,
        status:"interested"
    }).populate("fromUserId",['firstName','lastName']);
    // connectionRequest.save();
    res.json({
        message:"Data fetched successfully",
        data:connectionRequest
    })


}catch(err){
    res.status(400).send("err: "+err.message)
}

})
module.exports=userrouter;