const adminauth=(req,res,next)=>{
    const token="xyz";
    const isauth=token=="xyz";
    if(!isauth){
        res.status(401).send("unautherised request");
    }else{
        next()
    }
};
module.exports={adminauth,};