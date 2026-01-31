import { app } from "./app.js";
import dotenv from "dotenv"
import {connectDb} from "./db.js"
import http from "http"
import { Server } from "socket.io";





dotenv.config({
    path:'./.env'
})

 const server = http.createServer(app);

 export const io=new Server(server,{
    cors:{origin:"*"}
})

//store online users
export const userSocketMap={}; //userid:socketId

//connection handlwr
io.on("connection",(socket)=>{
    const userId=socket.handshake.query.userId;
    console.log(userId)
    console.log("new connection established",socket.id);  
    
    if(userId){
        userSocketMap[userId]=socket.id;
    }
    console.log("userSocketMap",userSocketMap);

    const onlineUsers=Object.keys(userSocketMap);
    console.log("online users",onlineUsers);

    io.emit("get-online-users",onlineUsers)//return array of keys(userId) online users
    socket.on("disconnect",()=>{
        console.log("user disconnected",userId);
        
            delete userSocketMap[userId];
            io.emit("get-online-users",Object.keys(userSocketMap))
        
    })
})







connectDb()
.then(()=>{
    server.listen(process.env.PORT,()=>{
        console.log("database connection successful");
        
        console.log(`server is listenin on port  ${process.env.PORT}`);
        
    })
})
.catch((error)=>{
    console.log("error connectin to database");
    
})




