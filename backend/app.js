import express from "express"
import cookieParser from "cookie-parser"
import cors from "cors"



const app=express();



app.use(cors({
  origin: "http://localhost:5173",  // your frontend URL

  credentials: true
}));


app.use(express.json());
app.use(cookieParser())
app.use(express.urlencoded({extended: true, limit: '16kb'}));
app.use(express.static('public'));

import { userRouter } from "./routes/user.route.js";

app.use("/api/user",userRouter);


export {app}