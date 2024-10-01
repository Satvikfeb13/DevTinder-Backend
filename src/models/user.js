const mongoose=require("mongoose");

const userSchema= new mongoose.Schema({
    firstName:{
        type:String,
        require:true,
        minlength:5
    },
    lastName:{
        type:String,
        require:true
    },
    emailId:{
        type:String,
        lowercase:true,
        require:true,
        unique:true,
        trim:true
    },
    password:{
        type:String,
        require:true 
    },
    age:{
        type:Number,
        min:18,
        max:99
    },
    gender:{
        type:String,
        validate(value){
            if(!["male","female","others"].includes(value)){
                throw new Error("Gender data is not valid");
            }
        }
    },
    photourl:{
        type:String,
        default:"https://api.api-ninjas.com/v1/randomimage?category=nature"
    },
    about:{
        type:String,
        default:"This is  default about user!"
    },
    skills:{
        type:[String]
    }
},{
    timestamps:true
})
module.exports=mongoose.model("User",userSchema);