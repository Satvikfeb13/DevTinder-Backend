const express = require("express");
const User = require("../models/user.js")
const { userauth } = require("../middlewares/auth.js");
const ConnectionRequest = require("../models/connectionrequest.js");
const connectionrequest = require("../models/connectionrequest.js");
const requestrouter = express.Router();
requestrouter.post("/request/send/:status/:toUserId", userauth, async (req, res) => {
    try {
        const fromUserId = req.user._id;
        const toUserId = req.params.toUserId;
        const status = req.params.status;
        const allowedstatus = ['ignored', 'interested'];
        // checking status
        if (!allowedstatus.includes(status)) {
            return res
                .status(400)
                .json({
                    message: "Invalid status type" + status
                })
        }
        // check the user is already exist or not
        const existingconnectionrequest = await ConnectionRequest.findOne({
            $or: [
                { fromUserId, toUserId },
                { fromUserId: toUserId, toUserId, fromUserId },
            ],
        })
        if (existingconnectionrequest) {
            return res
                .status(400)
                .send({
                    message: "Connection Request Already Exist"
                })
        }
        // console.log(toUserId);
        const touser = await User.findById(toUserId);
        if (!touser) {
                return res
                .status(404)
                .json({
                    message:"User not found"
                })

        }
        const Connectionrequest = new ConnectionRequest({
            fromUserId, toUserId, status
        });
        const data = await Connectionrequest.save();
        res.json({
            message: req.user.firstName+" is "+status+" in  "+touser.firstName,
            data
        })
    } catch (error) {
        res.status(400).send("Err: " + error.message);
    }
})
requestrouter.post("/request/review/:status/:requestId",userauth,async(req,res)=>{
  try{
    const loggedinuser=req.user;
    const {status,requestId}=req.params;
    const allowedstatus=['accepted','rejected'];
    if(!allowedstatus.includes(status)){
       return res
       .status(400)
       .json({
        message:"Invalid Status "+status
       })
    }
    const connectionRequest= await ConnectionRequest.findOne({
        _id:requestId,
        toUserId:loggedinuser._id,
        status:"interested"
    })
    if(!connectionRequest){
        return res
        .status(404)
        .json({message: "connection request not found"})
        
    }
    connectionRequest.status=status;
    const data= await connectionRequest.save();
    res.json({message:`${loggedinuser.firstName} has ${status} the connection request.`,data})
  }catch(err){
    res.status(400).send("Err: "+err.message);
  }

})
module.exports = requestrouter; 0