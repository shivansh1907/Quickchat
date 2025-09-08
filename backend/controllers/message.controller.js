import { User } from "../models/user.model";

const getUserforSidebar=async(req,res)=>{
    try {
        const users=await User.find({_id:{$ne:req.user._id}}).select("-password,").sort({createdAt:-1})
        return res.status(200).json({
            success:true,
            data:users
        })
        
    } catch (error) {
        console.log("error in get user for sidebar controller",error)
        return res.status(500).json({
            success:false,
            message:"internal server error"
        })
        
    }
}

export {getUserforSidebar}