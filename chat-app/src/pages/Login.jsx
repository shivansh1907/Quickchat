import React from 'react'
import assets from '../assets/assets'
import axios from "axios"
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const Login = () => {
    const navigate=useNavigate()
    const url="http://localhost:8080"
    const [details,setdetails]=React.useState({
        name:"",
        email:"",
        password:""
    })
    const [currstate,setcurrstate]=React.useState("Sign up")
    const handleChange=(e)=>{
        const name=e.target.name;
        const value=e.target.value

        setdetails((prev)=>({...prev,[name]:value}))
    }

    React.useEffect(()=>{
        console.log(details)
    },[details])
    const handleSubmit=async(e)=>{
         e.preventDefault()
        
    const formData=new FormData()
    let newUrl=url;
    if(currstate==="Sign up"){
      newUrl+="/api/user/register"
       
    formData.append("name",details.name);
    formData.append("email",details.email);
    formData.append("password",details.password);
    }
    else{
      newUrl+="/api/user/login"
      formData.append("email",details.email);
      formData.append("password",details.password);
    }

    const response=await axios.post(`${newUrl}`,formData)
    if(response.data.success){
  
      localStorage.setItem("token",response.data.token);
      setdetails({
        name:"",
        email:"",
        password:""
      })
   toast.success("Account created successfully")
   setTimeout(()=>{
    navigate("/")
   },1000)
     
    }
    else{
      alert(response.data.message)
      toast.error(response.data.message)
    }



    }
  return (
    <div className="h-screen items-center justify-center gap-9 flex flex-col sm:flex-row px-2">
       
       <div>
        <img src={assets.logo} className alt="" />
       </div>

       <form onSubmit={handleSubmit} className="backdrop-blur-md  border-gray-600 border-2 p-5 w-75 rounded-md">
        <div className="flex flex-col gap-6">
            <h1 className="text-2xl text-white">{currstate}</h1>
            <input onChange={handleChange} value={details.name} name="name"  type="text" placeholder='Full Name' className={`bg-transparent  border-1 text-white border-gray-500 rounded-sm placeholder-[#867e7e] p-1 ${currstate=="Login"?`hidden`:`block`}`} />
            <input onChange={handleChange} name="email" value={details.email} type="email" placeholder='Email Address' className="bg-transparent border-1 text-white border-gray-500 rounded-sm placeholder-[#867e7e] p-1 " />
            <input  onChange={handleChange} name="password" value={details.password} type="password" placeholder='Password' className="bg-transparent border-1 border-gray-500 text-white rounded-sm placeholder-[#867e7e] p-1 " />

          <button className="bg-purple-500 text-white text-[15px] rounded-sm p-2">Create Account</button>

          <div className="flex gap-2 items-center">
            <input type="radio" className="appearance-none w-3 h-3 border border-gray-400 rounded-sm checked:bg-violet-500 checked:border-blue-500" />
            <p className="text-[#ab9b9b] text-[12px]">Agree to terms of use & privacy policy</p>
          </div>


          {currstate=="Sign up"?

          <p className="text-[#ab9b9b] text-[14px]">Already have an account?<span  onClick={()=>setcurrstate("Login")} className="text-purple-500 cursor-pointer mx-1">Login here</span></p>:
          <p className="text-[#ab9b9b] text-[14px]">Create an account<span  onClick={()=>setcurrstate("Sign up")} className="text-purple-500 cursor-pointer mx-1">Click here</span></p>


           }

 
    
        </div>

     
       </form>

      
    </div>
  )
}

export default Login
