import React from 'react'
import assets, { messagesDummyData } from '../assets/assets.js'
import { messagetime } from '../lib/utils.js'
import { ChatContext } from '../../chatContext/chatContext.jsx'
import { AuthContext } from '../../context/context.jsx'
import { toast } from 'react-toastify'

const ChatContainer = () => {

  const {messages,selectedUser,setselectedUser, getmesssagesforSelectedUser,  sendMessageToSelectedUser}=React.useContext(ChatContext)
    const {authUser,onlineUsers}=React.useContext(AuthContext)

    const [input,setinput]=React.useState("")

    const handlesendMessage=async(e)=>{
      e.preventDefault()
      if(input.trim()!=''){
        await sendMessageToSelectedUser({text:input.trim()})
        setinput("")
      }
    }

    //handling sending an image
    const handleImageSend=async(e)=>{
      const file=e.target.files[0]
      if(!file || !file.type.startsWith("image/")){
        toast.error("Please select a valid image file")
        return
      }

      const reader=new FileReader()
      reader.onloadend=async()=>{
       
        await sendMessageToSelectedUser({image:imageDataUrl})
        e.target.value=""
      }
      reader.readAsDataURL(file)
    }

    React.useEffect(()=>{
      if(selectedUser){
        getmesssagesforSelectedUser(selectedUser._id)
      }
    },[selectedUser])




  return selectedUser?(
    <div className="h-full overflow-scroll flex flex-col relative backdrop-blur-lg">
        <div className="flex items-center p-4 justify-between border-b   border-b-gray-500 border-t-none border-r-none border-l-none" >
            <div className="flex gap-2 ">
                <img src={selectedUser?.profilePic || assets.avatar_icon} className="w-7 rounded-full" alt="" />
                <p className="text-white text-[15px]">
                   {selectedUser.name}
                </p>
            </div>

            <img src={assets.arrow_icon} onClick={()=>setselectedUser(null)} className="w-7 md:hidden" alt="" />
            <img src={assets.help_icon} className="hidden md:block max-w-5" alt="" />



        </div>

        {/* chat area */}
        <div className="flex flex-col h-[calc(100%-120px)] overflow-y-auto  p-3 pb-6">
            {messages.map((msg,index)=>{
                return <div key={index} className={`flex flex-end justify-end gap-3  ${msg.senderId==selectedUser._id && 'flex-row-reverse' }`}>
                    {
                        msg.image?(
                            <img className="max-w-[200px] border border-gray-700 rounded-lg  mb-8" src={msg.image} alt="" />


                        ):(
                            <p className={`p-2 max-w-[200px] md:text-sm font-light rounded-lg mb-8 break-alll bg-violet-500/30 text-white `}>{msg.text} </p>
                        )
                    }

                    <div className="text-center text-xs flex flex-col items-center gap-0.4">
                        <img className="w-7 rounded-full" src={msg.senderId===selectedUser._id?assets.avatar_icon:assets.profile_martin} alt="" />
                        <p className="text-gray-500">{messagetime(msg.createdAt)}</p>
                    </div>
                </div>
            })
            }
        </div>

        <div className=" w-full flex justify-center gap-2 items-center">
          <div className="flex items-center gap-1  justify-between bg-gray-100/12 rounded-full w-[85%] px-3 py-1">
            <input type="text" onChange={(e)=>setinput(e.target.value)} onKeyDown={(e)=>e.key=='Enter'?handlesendMessage(e):null} value={input} className="bg-none border-none outline-none placeholder-gray-400 text-white" placeholder="Type a message" />
            <input type="file" id="file" hidden />
            <label htmlFor="file"><img className="w-4.5 cursor-pointer" src={assets.gallery_icon} alt="" /></label>
          </div>

          <img className="w-7 cursor-pointer" onClick={handlesendMessage} src={assets.send_button} alt="" />
        </div>

       

       
      
    </div>
  ):
  <div className="md:flex flex-col items-center justify-center gap-5 hidden  ">
    <img src={assets.logo_icon} className="max-w-20" alt="" />
    <p className="text-white">Chat anywhere,anytime</p>
  </div>
}

export default ChatContainer
