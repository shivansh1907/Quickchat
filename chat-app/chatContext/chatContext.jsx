import React from 'react'
import { createContext } from 'react'
import { AuthContext } from '../context/context.jsx'
import { toast } from 'react-toastify'
import { useEffect } from 'react'
export const chatContext=createContext()

export const chatContextProvider = ({children}) => {
    const [messages,setmessages]=React.useState([])
    const [users,setusers]=React.useState([])// well store users for left sidebar
    const [selectedUser,setselectedUser]=React.useState(null)//we'll store id of user to whom we want to chat
    const [unseenMessages,setunseenMessages]=React.useState({})//{userId:number of unseen messages}

    const {socket,axios}=React.useContext(AuthContext)

    //function to fetch users for left sidebar
    const fetchUser=async()=>{
        try {
            const response=await axios.get("/api/message/sidebar")
            if(response.data.success){
                setusers(response.data.users)
                setunseenMessages(response.data.unseenMessages)
            }
            
        } catch (error) {
            toast.error("error in fetching users for sidebar")
            
        }
    }

    const getmesssagesforSelectedUser=async(userId)=>{
        try {
            const response=await axios.get(`/api/message/${userId}`)
            if(response.data.success){
                setmessages(response.data.messages)
            }
        } catch (error) {
            toast.error("error in fetching messages for selected user") 
        }
    }
//function to send message to selected user
    const sendMessageToSelectedUser=async(text)=>{
        try {
         const response=await axios.post(`/api/message/send/${selectedUser._id}`,text)
         if(response.data.success){
            setmessages((prev)=>[...prev,response.data.message])
         }
            else{
                toast.error("error in sending message to selected user")
            }
         }
         catch (error) {
            toast.error("error in sending message to selected user")
        }
    }  

    //function to subscribe to message for

    const subscribeToMessages=()=>{
        if(!socket)return;
        socket.on("new-message",(messageData)=>{
            if(selectedUser && messageData.senderId===selectedUser._id){
                messageData.seen=true
                setmessages((prev)=>[...prev,messageData])      
                axios.put(`/api/message/mark/${messageData._id}`)
        }
    else{
        setunseenMessages((prev)=>({...prev,[messageData.senderId]:prev[messageData.senderId]?prev[messageData.senderId]+1:1}))
    }}
    )
    }

    //function to unsubscribe for mesages
    const unsubscribeFromMessages=()=>{
        if(socket){
            socket.off("new-message")
        }
    }

    useEffect(()=>{
        subscribeToMessages()   
        return ()=>unsubscribeFromMessages()
    })


    

    
    value={
        messages,
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


    }
  return (
    <chatContext.Provider value={value}>
        {children}
    </chatContext.Provider>
      

  )
}

export default chatContext
