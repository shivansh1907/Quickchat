import { User } from "../models/user.model.js";
import { Message } from "../models/message.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import {io, userSocketMap} from "../index.js"

const getUserforSidebar=async(req,res)=>{
    try {
        console.log("req.user in get user for sidebar",req.user?._id)
        const users=await User.find({_id:{$ne:req.user._id}}).select("-password,")
        console.log("users for sidebar",users)
         //count number ppf messages  not seen
       const unseenMessages={} 
       const promises=users.map(async(user)=>{
        const messages=await Message.find({senderId:user._id,recieverId:req.user._id,seen:false})
        if(messages.length>0){
            unseenMessages[user._id]=messages.length;
        }
       })
        await Promise.all(promises);

        return res.json({
            success:true,
            users,
            unseenMessages
        })
    } 
    catch (error) {
        console.log("error in get user for sidebar controller",error)
        return res.status(500).json({
            success:false,
            message:"internal server error"
        })
        
    }
}

//get all mesages for selected users





 const getMessages=async(req,res)=>{
   try {
     const {id:selectedUserId}=req.params;
     const myId=req.user._id;
     const messages=await Message.find({
         $or:[{senderId:myId,recieverId:selectedUserId},
             {senderId:selectedUserId,recieverId:myId}
         ]
     })
      await Message.updateMany(
             {senderId:selectedUserId,recieverId:myId},
             {$set:{seen:true}}
 
         )
 
         return res.json({
             success:true,
             messages
         })
   } catch (error) {
    console.log("error in get messages controller",error)
    return res.status(500).json({
        success:false,
        message:"internal server error"
    })
   }
}

//api to mark message as  seen using messafgeId
 const markMessageAsSeen=async(req,res)=>{
    try {
        const {id}=req.params;
        await Message.findByIdAndUpdate(
            id,
            {
                $set:{
                       seen:true
                    }
           }
        )

        return res.json({success:true})
    

        
    } catch (error) {
        console.log("error in mark message as seen controller",error)
        return res.status(500).json({
            success:false,
            message:"internal server error"
        })
        
    }
}
   const sendMessage=async(req,res)=>{
    try {
        const {text,image}=req.body
        const recieverId=req.params.id;
        const senderId=req.user._id;
        if(!text && !image){
            return res.status(400).json({success:false})  
        }

        let imageurl;

        if(image){
            const upload=await uploadOnCloudinary(image)
            imageurl=upload.url
        }
        const message=await Message.create({
            senderId,
            recieverId,
            text,
            image:imageurl
        })
        const recieverSocketId=userSocketMap[recieverId]
        if(recieverSocketId){
            io.to(recieverSocketId).emit("new-message",message)
        }
        return res.status(200).json({
            success:true,
            message
        })
       
        
    } catch (error) {
        console.log("error in send message controller",error)   
        return res.json({success:false,message:"internal server error"})
        
    }
}



export {getUserforSidebar,getMessages,markMessageAsSeen,sendMessage}