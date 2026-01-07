import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { createContext } from "react";
import { toast } from "react-toastify";
import { io } from "socket.io-client";



const backendUrl=import.meta.env.VITE_BACKEND_URL;
axios.defaults.baseURL=backendUrl;

export const AuthContext=createContext();
export const AuthProvider=({children})=>{
    const [token,setToken]=useState(localStorage.getItem("token"));
    const [authUser,setauthUser]=useState(null);
    const [onlineUsers,setonlineUsers]=useState([])
    const [socket,setSocket]=useState(null);

    //check if user is authenticated and if so ,set the user data and connct and connect the socket
 
       const checkAuth=async()=>{
        try {
           const {data}=await axios.get("/api/user/checkAuth")
       
       if(data.success){
           setauthUser(data.user)
           connectSocket(data.user)
   
       }
   
 } catch (error) {
    toast.error("session expired,login again")
    
 }
}

//connect socket function to handle socet connection and online users updates
const connectSocket=(userData)=>{
    if(!userData || socket?.connected)return;

    const newSocket=new io(backendUrl,{
        query:{
            userId:userData._id

        }
    })

    newSocket.on("connect",()=>{
            setSocket(newSocket);
        
    })



    newSocket.on("get-online-users",(users)=>{
        setonlineUsers(users)
    
    })
}
useEffect(() => {
  if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common["Authorization"];
  }
}, [token]);





    const value={
        axios,
        connectSocket,
        authUser,
        setauthUser,
        token,
        setToken,
        onlineUsers,
        setonlineUsers,
        checkAuth


    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )

}