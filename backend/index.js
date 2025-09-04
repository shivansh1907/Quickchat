import { app } from "./app.js";
import dotenv from "dotenv"
import {connectDb} from "./db.js"


dotenv.config({
    path:'./.env'
})

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



