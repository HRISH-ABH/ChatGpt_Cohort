import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";

const registerUserController=async(req,res)=>{
try {
    
    const{fullName:{firstName,lastName},email,password}=req.body;

    if(!firstName ||!lastName || !email ||!password){
        return res.status(400).json({
            message:"All fields are required"
        })
    }

    const user=await userModel.findOne({email});
    if(user){
        return res.status(400).json({
            message:"User already exists"
        })
    }
    const newUser=await userModel.create({
        fullName:{
            firstName,
            lastName
        },
        email,
        password
    });
    const token= jwt.sign({id:newUser._id},process.env.JWT_SECRET,{expiresIn:"1d"});

    res.cookie("token",token);

    res.status(201).json({
        message:"User registered successfully",
        user:newUser
    });


} catch (error) {
    console.error(error);
    res.status(500).json({
        message:"Internal server error"
    });
}
}

const loginUserController=async(req,res)=>{
    try {
        const {email,password}=req.body;

        if(!email || !password){
            return res.status(400).json({
                message:"All fields are required"
            })
        }

        const user=await userModel.findOne({email});
        if(!user){
            return res.status(400).json({
                message:"User not found"
            })
        }

        const isMatch=await user.comparePassword(password);
        if(!isMatch){
            return res.status(400).json({
                message:"Invalid credentials"
            })
        }

        const token= jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:"1d"});
        res.cookie("token",token);

        res.status(200).json({
            message:"User logged in successfully",
            user
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message:"Internal server error"
        });
    }
}

export {
    registerUserController,
    loginUserController
}
