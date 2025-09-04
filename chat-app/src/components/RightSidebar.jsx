import React from 'react'
import { useNavigate } from 'react-router-dom';




const RightSidebar = ({selecteduser,setselecteduser}) => {
      const navigate=useNavigate();

      const handleLogout=()=>{

        navigate("/login")
      }
  
  return (
    <div className={`md:flex flex-col backdrop-blur-sm ${selecteduser?`block`:`hidden`} hidden `  }>

        <div className={`flex flex-col h-[40%] items-center border-b gap-2 pt-3 border-b-gray-500 justify-center `}>
            <img className="max-w-20 rounded-full" src={selecteduser?selecteduser.profilePic:null} alt="" />
            <p className="text-white">{selecteduser?selecteduser.fullName:null}</p>
            <p className="text-white text-[10px]">Hey My name is <span className="text-white text-[10px]">{selecteduser?selecteduser.fullName:null}</span></p>

        </div>

        <div className=" flex flex-col items-center relative h-[60%]">


            <button onClick={handleLogout} className="absolute  bg-purple-500 w-[80%] p-1 rounded-2xl text-white cursor-pointer bottom-8">Logout</button>
        </div>
      
    </div>
  )
}

export default RightSidebar
