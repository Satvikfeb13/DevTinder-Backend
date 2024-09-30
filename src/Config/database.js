const mongoose=require("mongoose");
const connectDB=async()=>{
    mongoose.connect(
        "mongodb+srv://patilsatvik1324:0000000@namsatedev.arjq8.mongodb.net/DevTinder"
    )
}
module.exports= connectDB
