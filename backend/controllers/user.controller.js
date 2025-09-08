import { User } from "../models/user.model.js";
import {generateToken} from "../utils/utils.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";


const registerUser=async(req,res)=>{
     console.log(req.body)

    const {name,email,password,bio}=req.body;

    if(!email || !name || !password){
        return res.status(400).json({
            success:false,
            message:"all fields required"
        })

        
    }

    //step 2
    const existedUser= await User.findOne({
            $or:[{name},{email}]
        })
        if(existedUser){
            res.status(400).json({
                success:false,
                message:"user already exists"

            })
        }

        //step 3

         const user =await User.create({
             name,
              email,
              password,
              bio
        })


      
        


         
      
       

   

    const createdUser=await User.findById(user._id).select("-password,-refreshToken")

    if(!createdUser){
        res.status(500).json({
            success:false,
            message:"user creation failed"
        })

       
    }

   const token=await generateToken(user._id)

     res.status(200).json({
            success:true,
            message:"user created successful",
            token,
            user:createdUser

        })


}

 const loginUser=async(req,res)=>{
 try {
       const {email,password}=req.body;
   
       if(!email || !password){
           return res.status(400).json({
               success:false,
               message:"all fields required"
           })
   
           
       }
   
       const user=await User.findOne({email})
       if(!user){
           return res.status(400).json({
               success:false,
               message:"user does not exist"
           })
       }
   
       const isPasswordValid=await bcrypt.compare(password,user.password)
       if(!isPasswordValid){
           return res.status(400).json({
               success:false,
               message:"invalid credentials"
           })
       }   
   
       const token= await generateToken(user._id)
   
       return res.status(200).json({
           success:true,
           message:"login successful",
           token,
           user
       })
 } catch (error) {
    console.log("error in login",error)
    return res.status(500).json({
        success:false,
        message:"internal server error"
    })
    
 }

}

 const checkAuth=async(req,res)=>{
    return res.status(200).json({
        success:true,
        user:req.user
    })
}

const updateProfile=async(req,res)=>{
    try {
        const {profilePic,bio,name}=req.body
        const userId=req.user._id;
        let updatedUser;
        if(!profilePic)[
            updatedUser=await User.findByIdAndUpdate(userId,{name,bio},{new:true})
        ]
        else{
            const upload= await uploadOnCloudinary(profilePic)
            updatedUser=await User.findByIdAndUpdate(userId,{name,bio,profilePic:upload.url},{new:true})
        }

        res.json({success:true,user:updatedUser})

        
    } catch (error) {
        console.log("error in update profile",error)
        return res.status(500).json({
            success:false,
            message:"internal server error"
        })
        
    }

}

   




export {registerUser,
    loginUser,
    checkAuth,
    updateProfile
}