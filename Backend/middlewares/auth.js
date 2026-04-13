import jwt from "jsonwebtoken"
function auth(req,res,next){
const token=req.headers.authorization?.split(" ")[1];
console.log(token);
if(!token){
    return res
    .status(401)
    .json({
        success:false,
        message:"No Token provided"
    });
}
const user=jwt.verify(token,"gaurav");

    if( !user){
        return 
        res.status(401)
        .json({
            success:false,
            message:"Invalid or expired token"
        })
    }
    req.user=user;
    next();
}

export default auth;