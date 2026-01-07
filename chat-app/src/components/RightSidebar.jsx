import React from 'react'
import { use } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChatContext } from '../../chatContext/chatContext.jsx';
import assets from '../assets/assets.js';


import { AuthContext } from '../../context/context.jsx';



const RightSidebar = () => {

  const {authUser,onlineUsers}=React.useContext(AuthContext)
const {selectedUser,setselectedUser}=React.useContext(ChatContext)

      const navigate=useNavigate();

      const handleLogout=()=>{

        navigate("/login")
      }
  
  return (
     selectedUser? <div  className={` md:flex border-l border-l-gray-500 flex-col backdrop-blur-sm hidden ${selectedUser?`flex`:`hidden`}  `  }>

        <div className={`flex flex-col h-[40%] items-center border-b gap-2 pt-3 border-b-gray-500 justify-center `}>
            <img className="max-w-20 rounded-full" src={selectedUser?.profilePic || assets.avatar_icon} alt="" />
            <p className="text-white">{selectedUser.name}</p>
            <p className="text-white text-[10px]">Hey My name is <span className="text-white text-[10px]">{selectedUser.name}</span></p>
            <p>{selectedUser.bio}</p>

        </div>

        <div className=" flex flex-col items-center relative h-[60%]">


            <button onClick={handleLogout} className="absolute  bg-purple-500 w-[80%] p-1 rounded-2xl text-white cursor-pointer bottom-8">Logout</button>
        </div>
      
    </div>:<div></div>
  )
}

export default RightSidebar
