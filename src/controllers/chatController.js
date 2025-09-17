import chatModel from "../models/chatModel.js";
import userModel from "../models/userModel.js";

const createChatController=async(req,res)=>{
    try {
        const user=req.user;
        console.log("user in create chat controller",req.user);
        
        const {title}=req.body;

        if(!title){
            return res.status(400).json({
                message:"Title is required"
            })
        }

        const chat=await chatModel.create({
            title,
            user: user._id
        });

        res.status(201).json({
            message:"Chat created successfully",
            chat
        })

        
    } catch (e) {
        return res.status(500).json({
            message:"Internal Server Error"
        });
    }
}
  
export {
    createChatController
}