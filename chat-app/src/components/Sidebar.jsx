import React, { useEffect } from 'react'
import assets, { userDummyData } from '../assets/assets.js'
import { useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { AuthContext } from '../../context/context.jsx'

import axios from 'axios'

import { toast } from 'react-toastify'
import {ChatContext} from '../../chatContext/chatContext.jsx'

const Sidebar = () => {

    const {
        authUser,
        setauthUser,
        token,
        setToken,
        onlineUsers,
        setonlineUsers}=useContext(AuthContext)

         const { messages,
        setmessages,
        users,  
        setusers,
        selectedUser,
        setselectedUser,
        getmesssagesforSelectedUser,
        sendMessageToSelectedUser,
        fetchUser,
        unseenMessages,
        setunseenMessages,
        subscribeToMessages,
        unsubscribeFromMessages
}=useContext(ChatContext)

    useEffect(()=>{
     

        fetchUser()
    },[])

    const [input,setinput]=React.useState(false)


    const handleClick=(user)=>{

        setselectedUser(user)
        getmesssagesforSelectedUser(user._id)
    }
   
   







    const navigate=useNavigate()
    const handleLogout=()=>{
        localStorage.removeItem("token")
   
        setauthUser(null)
        setToken(null)
        setonlineUsers([])


        navigate("/login")
        toast.success("Logged out successfully")
        

    }
    const filteredUsers=input?users.filter((user)=>user.name.toLowerCase().includes(input.toLowerCase())):users
  return (
    <div className={`bg-[#8285B2]/10 h-full p-5 rounded-r-xl  overflow-y-scroll text-white ${selectedUser? "max-md:hidden":''}`}>
    <div className='pb-4 relative'>
        <div className='flex justify-between items-center'>
            <img src={assets.logo} className='max-w-40' alt="" />
            <div className="relative py-2 group">
                <img src={assets.menu_icon} alt="" className='max-h-5 cursor-pointer' />
                <div className='absolute top-full right-0 z-20 w-32 p-2 rounded-md bg-[#282142] border border-gray-600 text-gray-100 hidden group-hover:block'>
                    <p onClick={()=>navigate('/profile')} className='cursor-pointer text-sm'>Edit profile</p>
                    <hr  className="my-2 border-t border-gray-500" />
                    <p onClick={handleLogout} className='cursor-pointer text-sm'>Logout</p>
                </div>
            </div>
        </div>

        <div className="  flex gap-3 justify-between w-full items-center my-4 bg-[#282142] p-2 rounded-2xl">
            <label htmlFor="search"><img src={assets.search_icon} className="max-w-3" alt="" /></label>
            
            <input onChange={(e)=>(setinput(e.target.value))} type="text" id="search" placeholder="Search user..." className="bg-transparent border-none outline-none text-white text-xs placeholder-[#c8c8c8] flex-1" />
        </div>



    </div>

    <div className="flex flex-col gap-6">
        {filteredUsers.map((user,index)=>{
            return (
                <div  key={index} onClick={()=>{
                    handleClick(user)
                    setunseenMessages((prev)=>({...prev, [user._id]: 0}))
                    }}  className={`relative max-sm:text-sm flex items-center p-2 gap-2 ${selectedUser?selectedUser._id==user._id?`bg-black`:`bg-transparent`:``}`}>
                    <img src={user?.profilePic || assets.avatar_icon } className="w-10  rounded-full" alt="" />
                    <div className="flex flex-col">
                        <p className="text-2xs">{user.name}</p>

                        {onlineUsers.includes(user._id) &&
                        <p className="text-green-300 text-xs">online</p>
          }
                    </div>

                    {unseenMessages?.[user._id]>0 && <p className="absolute flex items-center justify-center bg-violet-500/50 w-6 h-6 rounded-full right-1">+{unseenMessages[user._id]}</p>
                    }


                </div>
            )
        })}
    </div>
    </div>
  )
}

export default Sidebar
