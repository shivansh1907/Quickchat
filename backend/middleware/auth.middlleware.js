import jwt from "jsonwebtoken"
import { User } from "../models/user.model.js";

export const protectedRoute=async (req,res,next)=>{
    try {
        const token=req.headers.authorization?.split(" ")[1];
       console.log("AUTH HEADER:", req.headers.authorization);

        if(!token){
            return res.status(401).json({message:"unauthorized access,no token"})
        }
        console.log("Hi")

        console.log("Access token secret",process.env.ACCESS_TOKEN_SECRET)
        const decoded_token=jwt.verify(token,process.env.ACCESS_TOKEN_SECRET)
        console.log("decoded token in auth middleware",decoded_token)

        const user=await User.findById(decoded_token.userId).select("-password")
        console.log("user in auth middleware",user) 
        if(!user){
            return res.status(401).json({
                success:false,
                message:"user not found"
            })
        }
        req.user=user;
        next();

        
    } catch (error) {
        console.log("error in auth middleware")
        return res.status(401).json({
            success:false,
            message:"unauthorized access"
        })
        
    }

}