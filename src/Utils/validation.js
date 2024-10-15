const validation = require("validator");
const validateSignUpdata = (req) => {
    const { firstName, lastName, password, emailId } = req.body;
    if (!firstName || !lastName) {
        throw new Error("Name is not valid ")
    } else if (!validation.isEmail(emailId)) {
        throw new Error("Email is not valid ")
    } else if (!validation.isStrongPassword(password)) {
        throw new Error("Please Enter a Strong password ")
    }
}
const validateEditProfileData=(req)=>{
    const AllowEditFields =["FirstName","lastName","photourl","emailId","skills","about","age","gender"]
    const iseditallowed=Object.keys(req.body).every(field=>AllowEditFields.includes(field));
    // console.log(iseditallowed);
    return iseditallowed;
}

  
  module.exports = {
    validateSignUpdata,
    validateEditProfileData
  };