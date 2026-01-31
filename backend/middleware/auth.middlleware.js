import jwt from "jsonwebtoken"
import { User } from "../models/user.model.js";

export const protectedRoute=async (req,res,next)=>{
    try {
        const token=req.headers.authorization?.split(" ")[1];
       

        if(!token){
            return res.status(401).json({message:"unauthorized access,no token"})
        }
        

      
        const decoded_token=jwt.verify(token,process.env.ACCESS_TOKEN_SECRET)
        

        const user=await User.findById(decoded_token.userId).select("-password")
      
        if(!user){
            return res.status(401).json({
                success:false,
                message:"user not found"
            })
        }
        req.user=user;
        next();

        
    } catch (error) {
        console.log("error in auth middleware",error)
        return res.status(401).json({
            success:false,
            message:"unauthorized access"
        })
        
    }

}