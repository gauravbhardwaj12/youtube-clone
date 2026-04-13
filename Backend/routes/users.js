import express from "express";
import usermodel from "../models/usermodel.js";
import jwt from "jsonwebtoken";
import auth from "../middlewares/auth.js";
const usersRouter=express.Router();

usersRouter.get("/",async (req,res)=>{
    const users=await usermodel.find();
    res.send(users);
});

usersRouter.post("/register",async (req,res)=>{
    const {username,email,password}=req.body;
    console.log(username,email,password)
    if(!username || !email || !password) {
        return res.status(400).json({error:"either username, email and password is not available"})
    }
    const existuser=await usermodel.findOne({email});
    if(existuser){
        return res.status(400).json({
            status:false,
            message:"user exist"
        })
    };
    const user=new usermodel({
        username:username,
        email:email,
        password:password
    });
    await user.save()
    .then(()=>res.status(200).json({
        success:true,
    }))
    .catch((e)=>res.status(400).json({success:false,error:e}));
    
});

// login route

usersRouter.post("/login", async (req,res)=>{
    const {email,password}=req.body;
    if(!email || !password){
        return res.status(404).json({success:false,message:"provide email and password"});
    }
    const user=await usermodel.findOne({email});
    if(!user){
        res.status(400).json({error:"provide correct email"});
    }
    
    const  ismatch=await user.comparePassword(password);
    if(!ismatch){
         res.status(400).json({error:"wrong password"})
    }

    const {password:_,...safeUser} =user.toObject();
    
    // create Token
    console.log(user._id);
    const token=jwt.sign(
        {  userId:user._id,
            email:user.email},
        "gaurav",
        {expiresIn:"1h"}
    );
    res.status(200).json({
        success:true,
        token,
        user:safeUser
    });
       
})

//profile route
usersRouter.get("/loggedin",auth,(req,res)=>{
    console.log(req.user);
    
    res.status(200).json({success:true,email:req.user.email,id:req.user.userId});

})

export default usersRouter;