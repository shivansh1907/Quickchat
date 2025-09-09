import express from "express"
import { Message } from "../models/message.model.js";
import { protectedRoute } from "../middleware/auth.middlleware.js";
import { getMessages } from "../controllers/message.controller.js";
import { getUserforSidebar } from "../controllers/message.controller.js";
import { markMessageAsSeen } from "../controllers/message.controller.js";

const messageRouter=express.Router();

messageRouter.get("/sidebar",protectedRoute,getUserforSidebar)

messageRouter.get("/:id",protectedRoute,getMessages)
messageRouter.put("mark/:id",protectedRoute,markMessageAsSeen)

export default messageRouter