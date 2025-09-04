import React from 'react'
import assets, { messagesDummyData } from '../assets/assets.js'

const ChatContainer = ({selecteduser,setselecteduser}) => {
  return selecteduser?(
    <div>
        <div className="flex items-center p-4 justify-between border-b  border-b-gray-500 border-t-none border-r-none border-l-none" >
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
        <div className="flex flex-col h-[calc(100%-120px)] overflow-y-scroll p-3 pb-6">
            {messagesDummyData.map((item,index)=>{
                return <div key={index} className={`flex flex-end justify-end gap-2`}>
                </div>
            })
            }
        </div>

       

       
      
    </div>
  ):
  <div className="md:flex flex-col items-center justify-center gap-5 hidden  ">
    <img src={assets.logo_icon} className="max-w-20" alt="" />
    <p className="text-white">Chat anywhere,anytime</p>
  </div>
}

export default ChatContainer
