import React from 'react'
import assets, { messagesDummyData } from '../assets/assets.js'
import { messagetime } from '../lib/utils.js'

const ChatContainer = ({selecteduser,setselecteduser}) => {
  return selecteduser?(
    <div className="h-full overflow-scroll flex flex-col relative backdrop-blur-lg">
        <div className="flex items-center p-4 justify-between border-b   border-b-gray-500 border-t-none border-r-none border-l-none" >
            <div className="flex gap-2 ">
                <img src={selecteduser.profilePic} className="w-7 rounded-full" alt="" />
                <p className="text-white text-[15px]">
                   {selecteduser.fullName}
                </p>
            </div>

            <img src={assets.arrow_icon} onClick={()=>setselecteduser(null)} className="w-7 md:hidden" alt="" />
            <img src={assets.help_icon} className="hidden md:block max-w-5" alt="" />



        </div>

        {/* chat area */}
        <div className="flex flex-col h-[calc(100%-120px)] overflow-y-auto  p-3 pb-6">
            {messagesDummyData.map((msg,index)=>{
                return <div key={index} className={`flex flex-end justify-end gap-3  ${msg.senderId!==`680f50e4f10f3cd28382ecf9` && 'flex-row-reverse' }`}>
                    {
                        msg.image?(
                            <img className="max-w-[200px] border border-gray-700 rounded-lg  mb-8" src={msg.image} alt="" />


                        ):(
                            <p className={`p-2 max-w-[200px] md:text-sm font-light rounded-lg mb-8 break-alll bg-violet-500/30 text-white `}>{msg.text} </p>
                        )
                    }

                    <div className="text-center text-xs flex flex-col gap-1">
                        <img className="w-7 rounded-full" src={msg.senderId==='680f50e4f10f3cd28382ecf9'?assets.avatar_icon:assets.profile_martin} alt="" />
                        <p className="text-gray-500">{messagetime(msg.createdAt)}</p>
                    </div>
                </div>
            })
            }
        </div>

        <div className=" w-full flex justify-center gap-2 items-center">
          <div className="flex items-center gap-1  justify-between bg-gray-100/12 rounded-full w-[85%] px-3 py-1">
            <input type="text" className="bg-none border-none outline-none placeholder-gray-400 text-white" placeholder="Type a message" />
            <input type="file" id="file" hidden />
            <label htmlFor="file"><img className="w-4.5 cursor-pointer" src={assets.gallery_icon} alt="" /></label>
          </div>

          <img className="w-7 cursor-pointer" src={assets.send_button} alt="" />
        </div>

       

       
      
    </div>
  ):
  <div className="md:flex flex-col items-center justify-center gap-5 hidden  ">
    <img src={assets.logo_icon} className="max-w-20" alt="" />
    <p className="text-white">Chat anywhere,anytime</p>
  </div>
}

export default ChatContainer
