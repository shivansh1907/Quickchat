import React from 'react'
import assets from '../assets/assets'

const Login = () => {
    const [currstate,setcurrstate]=React.useState("Sign up")
  return (
    <div className="h-screen items-center justify-center gap-9 flex flex-col sm:flex-row px-2">
       
       <div>
        <img src={assets.logo} className alt="" />
       </div>

       <div className="backdrop-blur-md  border-gray-600 border-2 p-5 w-75 rounded-md">
        <div className="flex flex-col gap-6">
            <h1 className="text-2xl text-white">{currstate}</h1>
            <input type="text" placeholder='Full Name' className={`bg-transparent  border-1 text-white border-gray-500 rounded-sm placeholder-[#867e7e] p-1 ${currstate=="Login"?`hidden`:`block`}`} />
            <input type="email" placeholder='Email Address' className="bg-transparent border-1 text-white border-gray-500 rounded-sm placeholder-[#867e7e] p-1 " />
            <input type="password" placeholder='Password' className="bg-transparent border-1 border-gray-500 text-white rounded-sm placeholder-[#867e7e] p-1 " />

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

     
       </div>

      
    </div>
  )
}

export default Login
