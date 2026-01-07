import React from 'react'
import assets from '../assets/assets.js'
import axios from 'axios'
import { toast } from 'react-toastify'

const Profile = () => {
  const handleChange=(e)=>{
    const name=e.target.name
    const value=e.target.value

    setdetails((prev)=>({
      ...prev,
      [name]:value
    }))
  }

  const url="http://localhost:8080/api/user/updateProfile"


  const [details, setdetails] = React.useState({
    name:"",
    bio:"",
  
  })
  const handlesubmit=async(e)=>{
    e.preventDefault()
    //logic to update profile details
    if(details.name.trim()!='' || details.bio.trim()!=''){
    console.log(details)
    const formdata=new FormData()
    formdata.append("name",details.name)
    formdata.append("bio",details.bio)
   
    const response=await axios.put(`${url}`,{
      name:details.name,
      bio:details.bio
    })
    if(response.data.success){
      console.log("profile updated successfully")
      toast.success("Profile updated successfully")
      setdetails({
        name:"",
        bio:""
      })

    }

  }
}
  return (
    <div className="h-screen flex items-center justify-center">
        <div className="profile-box h-[58%] p-3 flex flex-col items-center backdrop-blur-2xl  w-[50%] md:w-[70%] border-1 border-gray-200 rounded-xl sm:w-[40%]">
          <div className='text-white text-xl mb-4'><h1>Edit Profile</h1></div>
          <div className="image-input flex w-[100%] flex-col items-center md:flex-row md:justify-between">
            <form onSubmit={handlesubmit} className="flex flex-col gap-6 items-center">
              <input type="text" className="p-2 text-white border-1 border-gray-400 rounded-[7px]" placeholder="Enter your name" name="name" onChange={handleChange} />
               <input type="textarea" className="p-2 h-30 text-white border-1 border-gray-400 rounded-[7px]" placeholder="Enter your bio" name="bio" onChange={handleChange} />
               <button className="text-black border rounded-sm p-2 bg-violet-500 w-[100%]" >Update</button>
            </form>

          </div>
          

        </div>

      
    </div>
  )
}

export default Profile
