const mongoose=require("mongoose");
const connectionrequesstschema= new mongoose.Schema({
    fromUserId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        require:true
    },
    toUserId:{
        type:mongoose.Schema.Types.ObjectId,
        require:true
    },
    status:{
        type:String,
        require:true,
        enum:{
            values:['ignored','interested','accepted','rejected'],
            message:"{VALUE} is incorrect status type"
        }
    }
},
{
    timestamps:true
})
connectionrequesstschema.index({fromUserId:1,toUserId:1});
connectionrequesstschema.pre("save",function(next) {
    const ConnectionRequest=this;
    if(ConnectionRequest.fromUserId.equals(ConnectionRequest.toUserId)){
        throw new error ("Cannot Send Connection Request to yourself")
    }
    next();
})
module.exports=new mongoose.model("ConnectionRequest",connectionrequesstschema);