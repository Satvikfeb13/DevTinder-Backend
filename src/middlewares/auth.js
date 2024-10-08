const jwt=require("jsonwebtoken");
const User=require("../models/user")
const userauth= async(req,res,next)=>{
try{
        const {token}=req.cookies;
        if(!token){
            throw new Error("Token is not valid");
        }
        // validate the token
        const decodedmessage= await jwt.verify(token,"satvik@1324");
        const{_id}=decodedmessage;
        const user=await User.findById(_id);
        if(!user){
            throw new Error("User does not found");
        }
        req.user=user;
        next();
}catch(err){
    res.status(400).send("Error : "+err.message);
}
    // find the user

};
module.exports={userauth,};