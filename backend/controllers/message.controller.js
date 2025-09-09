import { User } from "../models/user.model";
import { Message } from "../models/message.model.js";

const getUserforSidebar=async(req,res)=>{
    try {
        const users=await User.find({_id:{$ne:req.user._id}}).select("-password,")
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
            success:"true",
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





export const getMessages=async(req,res)=>{
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
export const markMessageAsSeen=async(req,res)=>{
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

export {getUserforSidebar,getMessages,markMessageAsSeen}