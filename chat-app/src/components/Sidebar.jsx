import React from 'react'
import assets, { userDummyData } from '../assets/assets'
import { useNavigate } from 'react-router-dom'

const Sidebar = ({selecteduser,setselecteduser}) => {
    const navigate=useNavigate()
    const handleLogout=()=>{


        navigate("/login")

    }
  return (
    <div className={`bg-[#8285B2]/10 h-full p-5 rounded-r-xl  overflow-y-scroll text-white ${selecteduser? "max-md:hidden":''}`}>
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
            <img src={assets.search_icon} className="max-w-3" alt="" />
            <input type="text" placeholder="Search user..." className="bg-transparent border-none outline-none text-white text-xs placeholder-[#c8c8c8] flex-1" />
        </div>



    </div>

    <div className="flex flex-col gap-6">
        {userDummyData.map((item,index)=>{
            return (
                <div  key={index}  className="relative max-sm:text-sm flex items-center gap-2">
                    <img src={item.profilePic} className="w-10  rounded-full" alt="" />
                    <div className="flex flex-col">
                        <p className="text-2xs">{item.fullName}</p>
                        <p className="text-green-300 text-xs">online</p>
                    </div>

                    {index>2 && <p className="absolute flex items-center justify-center bg-violet-500/50 w-7 h-7 rounded-full right-1">+{index}</p>
                    }


                </div>
            )
        })}
    </div>
    </div>
  )
}

export default Sidebar
