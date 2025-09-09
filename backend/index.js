import { app } from "./app.js";
import dotenv from "dotenv"
import {connectDb} from "./db.js"
import http from "http"
import { Server } from "socket.io";

export const io=new Server(server,{
    cors:{origin:"*"}
})



dotenv.config({
    path:'./.env'
})

//  const server = http.createServer(app);

connectDb()
.then(()=>{
    app.listen(process.env.PORT,()=>{
        console.log("database connection successful");
        
        console.log(`server is listenin on port  ${process.env.PORT}`);
        
    })
})
.catch((error)=>{
    console.log("error connectin to database");
    
})



