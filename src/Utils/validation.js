const validation=require("validator");
const validateSiguUpdata=(req)=>{
    const{firstName,lastName,password,emailId}=req.body;
    if(!firstName || !lastName){
        throw new Error("Name is not valid ")
    }else if(!validation.isEmail(emailId)){
        throw new Error("Email is not valid ")
    }else if(!validation.isStrongPassword(password)){
        throw new Error("Please Enter a Strong password ") 
    }
}
module.exports={validateSiguUpdata}