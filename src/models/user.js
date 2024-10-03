const mongoose=require("mongoose");
const validator=require("validator");

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
        trim:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Invalid Email address: "+value)
            }
        }
    },
    password:{
        type:String,
        require:true ,
        validate(value){
            if(!validator.isStrongPassword(value)){
                throw new Error("Enter a Strong Password: "+value)
            }
        }
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
        validate(value){
            if(!validator.isURLl(value)){
                throw new Error("Invalid URL : "+value)
            }
        }
    },
    about:{
        type:String,
        default:"This is  default about user!"
    },
    skills:{
        type:[String],
    }
},{
    timestamps:true,

})
module.exports=mongoose.model("User",userSchema);