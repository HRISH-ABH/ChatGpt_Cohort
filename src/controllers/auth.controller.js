import jwt from "jsonwebtoken";
import userModel from "../models/user.model.js";

async function getRegisterController(req, res) {
  console.log("Register Page rendering!");

  return res.render("register");
}
async function postRegisterController(req, res) {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.json({
        message: "Missing Credentials!!",
      });
    }

    const userExists = await userModel.findOne({
      $or: [{ username: username }, { email: email }],
    });

    if (userExists) {
      return res.json({
        message: "User already Exists!!",
      });
    }

    const user = await userModel.create({
      username,
      email,
      password,
    });

    const token =  jwt.sign({ email }, process.env.JWT_SECRET);

    res.cookie("token", token);

    res.status(201).json({
      success: true,
      message: "User created successfully!",
      user,
    });
  } catch (error) {
    console.log(error,error.message);
    
    return res.json({
      message: error.message,
    });
  }
}

export { getRegisterController, postRegisterController };
