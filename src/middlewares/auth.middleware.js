import  jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";

async function authenticateUser  (req,res,next) {
    
    try {
        const token =req.cookies.token;

        if(!token){
            return res.status(401).json({
                message:"Unauthorized"
            })
        }

        const decoded=jwt.verify(token,process.env.JWT_SECRET);
        const user=await userModel.findById(decoded.id);
        if(!user){
            return res.status(401).json({
                message:"Unauthorized"
            })
        }
        req.user=user;
        console.log("user in auth middleware",req.user);
        
        next();
    } catch (error) {
        return res.status(500).json({
            message:"Internal Server Error"
        })
    }
}

export default authenticateUser;