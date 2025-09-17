import express from "express";
import authenticateUser from "../middlewares/auth.middleware.js";       
import { createChatController } from "../controllers/chatController.js";

const router=express.Router();


router.get("/",authenticateUser,(req,res)=>{
    res.json({message:"Chat route is working"});
})

router.post("/create",authenticateUser,createChatController);

export default router;