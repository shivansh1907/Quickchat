import axios from "axios";

import { useEffect } from "react";
import { useState } from "react";
import { createContext } from "react";
import { toast } from "react-toastify";
import { io } from "socket.io-client";




const backendUrl="http://localhost:8080";
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
           console.log("response from check auth",data)
       
       if(data.success){
           setauthUser(data.user)
           console.log("authUser state",authUser)
         
             
   
       }
   
 } catch (error) {
    toast.error("session expired,login again")
    
 }
}

//connect socket function to handle socet connection and online users updates
const connectSocket=(userData)=>{
    if(!userData || socket)return;

    const newSocket= io(backendUrl,{
        query:{
            userId:userData._id

        },
    })

    newSocket.connect();
    console.log(newSocket)
    setSocket(newSocket);
    console.log("socket set to",newSocket)
    console.log("socket connected",socket)
   



    newSocket.on("get-online-users",(users)=>{
        console.log("online users from socket",users)
        setonlineUsers(users)
      
    
    })
   
}
useEffect(() => {
  if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common["Authorization"];
  }

  checkAuth();
}, []);





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