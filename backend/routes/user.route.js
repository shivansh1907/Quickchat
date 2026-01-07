import express from "express"
import multer from "multer"
import { checkAuth, loginUser, registerUser ,updateProfile } from "../controllers/user.controller.js"
import { protectedRoute } from "../middleware/auth.middlleware.js"

const userRouter=express.Router()
const upload=multer()


userRouter.post("/register",upload.none(),registerUser)
userRouter.post("/login",upload.none(),loginUser)
userRouter.put("/updateProfile",upload.none(),protectedRoute,updateProfile)
userRouter.get("/checkAuth",protectedRoute,checkAuth)





export {userRouter} 