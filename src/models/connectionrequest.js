const mongoose=require("mongoose");
const connectionrequesstschema= new mongoose.Schema({
    fromUserId:{
        type:mongoose.Schema.Types.ObjectId,
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
            values:['ignored','interested','accepeted','rejected'],
            message:"{VALUE} is incorrect status type"
        }
    }
},
{
    timestamps:true
})
module.exports=new mongoose.model("ConnectionRequest",connectionrequesstschema);