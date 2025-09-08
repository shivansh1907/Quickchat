import jwt from "jsonwebtoken"
import { User } from "../models/user.model.js";

export const protectedRoute=(req,res,next)=>{
    try {
        const token=req.headers.token;
        const decoded_token=jwt.verify(token,process.env.ACCESS_TOKEN_SECRET)

        const user=User.findById(decoded_token._id).select("-password")
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