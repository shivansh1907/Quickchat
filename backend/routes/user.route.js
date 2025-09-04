import express from "express"
import multer from "multer"
import { registerUser } from "../controllers/user.controller.js"

const userRouter=express.Router()
const upload=multer()


userRouter.post("/register",upload.none(),registerUser)



export {userRouter}