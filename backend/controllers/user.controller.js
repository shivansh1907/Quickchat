import { User } from "../models/user.model.js";


const registerUser=async(req,res)=>{
     console.log(req.body)

    const {name,email,password}=req.body;

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
        })
      
        


         
      
       

   

    const createdUser=await User.findById(user._id).select("-password,-refreshToken")

    if(!createdUser){
        res.status(500).json({
            success:false,
            message:"user creation failed"
        })

       
    }

   const token=await user.generateAccessToken()

     res.status(200).json({
            success:true,
            message:"user created successful",
            token

        })


}

   




export {registerUser}