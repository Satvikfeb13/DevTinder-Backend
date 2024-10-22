const express=require("express");
const userrouter=express.Router();
const {userauth}=require("../middlewares//auth");
const User=require("../models/user");
const ConnectionRequest = require("../models/connectionrequest");
const USER_SAFE_DATA = 'firstName lastName age gender skills about status'
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
userrouter.get("/user/connections",userauth,async(req,res)=>{
try{
    const loggedInUser=req.user;
    const connectionRequest= await ConnectionRequest.find({
        $or:[
            {toUserId:loggedInUser._id,status:"accepted"},
            {fromUserId:loggedInUser._id,status:"accepted"}
        ]
    }).populate("fromUserId",USER_SAFE_DATA).populate("toUserId",USER_SAFE_DATA);
    const data =connectionRequest.map((row)=>{
        if(row.fromUserId._id.tostring()===loggedInUser._id.tostring()){
            return row.toUserId;
        }else{ 
            return row.fromUserId;
        }
    })

    res.json({data})

}catch(err){
    res.status(400).json({
        message:err.message
    })
}

})
userrouter.get("/user/feed",userauth,async(req,res)=>{
    try{
        const loggedInUser=req.user;
        const connectionRequests=await ConnectionRequest.find({
            $or:[
                {fromUserId:loggedInUser._id},
                {toUserId:loggedInUser._id},
            ]
        }).select('fromUserId toUserId')
        const hideuserfromfeed= new Set();
        connectionRequests.forEach((req) => {
            hideuserfromfeed.add(req.fromUserId.toString());
            hideuserfromfeed.add(req.toUserId.toString());

        });
        const users=  await User.find({
            $and:[
                {_id:{$nin:Array.from(hideuserfromfeed)}},
                {_id:{$ne:loggedInUser._id}},
            ],
        }).select(USER_SAFE_DATA)
        res.send(users);

    }catch(err){
        res.status(400).send("err: "+err.message);
    }
})
module.exports=userrouter;